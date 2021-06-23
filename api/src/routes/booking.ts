import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Booking, BookingStatus } from '../models/booking';
import { Accommodation, AccommoDoc, } from '../models/accommodation';

import { validateRequest } from '../middlewares/validate_request';
import { checkDateInRange, flattArr, getDateShortString } from '../utils/linq';
import { Room, RoomDoc } from '../models/rooms';

const router = express.Router();

router.get('/api/booking', async (req:Request , res:Response) => {
    const booking = await Booking.aggregate([
        { 
            $lookup: {
                from: "rooms", 
                localField: "rooms", 
                foreignField: "_id",
                as: 'rooms'
            },
        },
    ]).exec();
    res.send(booking);
});

router.get('/api/booking/room-available/:checkInTime-:checkOutTime', async (req:Request , res:Response) => {
    const {checkInTime,checkOutTime} = req.params;
    // const booking = Booking.find({checkInTime :  { "$gte" : ISO checkInTime }});
    const bookingRoom = await Booking.find().populate('rooms').exec();
    let data = bookingRoom.filter(
        d => checkDateInRange(getDateShortString(d.checkInTime),getDateShortString(d.checkOutTime),getDateShortString(checkInTime)) || checkDateInRange(getDateShortString(d.checkInTime),getDateShortString(d.checkOutTime),getDateShortString(checkOutTime)));
    // console.log(bookingRoom)
    console.log(data);
    const rooms = data.map(({ rooms }) => rooms);
    const roomIds = flattArr(rooms);
    const accoommodationIds = roomIds.map(({accommodation}) => accommodation);

    const accomodations = await Accommodation.find({'_id': {$in:accoommodationIds}});

    res.send(accomodations);
});

router.post('/api/booking',
    [
        body('name')
            .not()
            .isEmpty() 
            .isString()
            .withMessage('Name is required'),
        body('phone')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Phone is required'),
        body('email')
            .not()
            .isEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        body('address')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Address is required'),
        body('checkInTime')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Checkin Time is required'),
        body('checkOutTime')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Checkout Time is required'),
        
        body('rooms')
            .isArray()
            .withMessage("Rooms must be an array")
            .custom((input : [string]) => input.length > 0)
            .withMessage("At least one room is required")
    ],
    validateRequest,
    async (req:Request , res:Response) => {
        const {
            name,
            phone,
            email,
            address,
            checkInTime,
            checkOutTime,
            rooms,
        } = req.body;

        const roomsId : string[] = [];

        rooms.map((v: RoomDoc) => {

        });
        
        const roomsObj = await Room.insertMany(rooms);

        const roomIds : string[] = [];

        roomsObj.map((v: RoomDoc) => roomIds.push(v._id));

        const booking = Booking.build({
            name,
            phone,
            email,
            address,
            checkInTime,
            checkOutTime,
            rooms : roomIds,
        });

        await booking.save();

        res.status(201).send(booking);
    }
);


export { router as bookingRouter};