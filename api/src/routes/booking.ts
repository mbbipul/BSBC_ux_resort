import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Booking, BookingStatus } from '../models/booking';
import { Accommodation, AccommoDoc, } from '../models/accommodation';

import { validateRequest } from '../middlewares/validate_request';
import { checkDateInRange, flattArr, getDateShortString } from '../utils/linq';
import { Room, RoomDoc } from '../models/rooms';
import { NotFoundError } from '../errors/not_found_error';

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

router.get('/api/booking/:id', async (req:Request , res:Response) => {
    const booking = await Booking.findById(req.params.id);

    if(!booking){
        throw new NotFoundError();
    }
    res.send(booking);
});


router.get('/api/booking/room-available/:checkInTime-:checkOutTime', async (req:Request , res:Response) => {
    const {checkInTime,checkOutTime} = req.params;
    // const booking = Booking.find({checkInTime :  { "$gte" : ISO checkInTime }});
    const bookingRoom = await Booking.find({"status": {$ne: BookingStatus.Cancell}}).populate('rooms').exec();
    let data = bookingRoom.filter(
        d => checkDateInRange(getDateShortString(d.checkInTime),getDateShortString(d.checkOutTime),getDateShortString(checkInTime)) || checkDateInRange(getDateShortString(d.checkInTime),getDateShortString(d.checkOutTime),getDateShortString(checkOutTime)));
    // console.log(bookingRoom)
    const rooms = data.map(({ rooms }) => rooms);
    const roomIds = flattArr(rooms);

    const real_accoms = await Accommodation.find().populate('rooms').exec();
    
    real_accoms.map((acc_real) => {
        const res = roomIds.filter(({accommodation }) => String(accommodation) === String(acc_real._id));
        console.log({
            res,
            id : acc_real._id
        })

        const tmp = {
            singleRoom : res.reduce((acc,cur : any) => acc+cur.singleRoom,0),
            doubleRoom : res.reduce((acc,cur : any) => acc+cur.doubleRoom,0),
            famillyRoom : res.reduce((acc,cur : any) => acc+cur.famillyRoom,0)
        };

        acc_real.singleRoom = acc_real.singleRoom - tmp.singleRoom;
        acc_real.doubleRoom = acc_real.doubleRoom - tmp.doubleRoom;
        acc_real.famillyRoom = acc_real.famillyRoom - tmp.famillyRoom;

    });

    res.send(real_accoms);
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

router.post('/api/booking/cancell',
    [
        body('secretCode')
            .not()
            .isEmpty() 
            .isString()
            .withMessage('secretCode is required'),
    ],
    validateRequest,
    async (req:Request , res:Response) => {
        const {
            secretCode
        } = req.body;

        const booking = await Booking.findOne({_id : secretCode});
        
        if(booking){
            booking.status = BookingStatus.Cancell;
            await booking.save();
        }else {
            res.status(409).send({ message : "Booking not found"});
        }
        res.status(200).send(booking);
    }
);

export { router as bookingRouter};