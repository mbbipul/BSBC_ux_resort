import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Booking, BookingStatus } from '../models/booking';
import mongoose from 'mongoose';
import { validateRequest } from '../middlewares/validate_request';
import { checkDateInRange, getDateShortString } from '../utils/linq';

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
    const bookingRoom = await Booking.find({});
    let data = bookingRoom.filter(
        d => !checkDateInRange(getDateShortString(checkInTime),getDateShortString(checkOutTime),getDateShortString(d.checkInTime)) && !checkDateInRange(getDateShortString(checkInTime),getDateShortString(checkOutTime),getDateShortString(d.checkOutTime)));
    // console.log(bookingRoom)
    res.send(data);
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
        body('country')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Country name is required'),
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
        body('adults')
            .not()
            .isEmpty()
            .custom((input : number) => input > 0 ) 
            .withMessage('Number of adults at least 1 person requied'),
        body('rooms')
            .isArray()
            .withMessage("Rooms must be an array")
            .custom((input : [string]) => input.length > 0)
            .withMessage("At least one room is required")
            .custom((input : [string]) => input.every(mongoose.Types.ObjectId)) 
            .withMessage('Valid Room id is required'),
    ],
    validateRequest,
    async (req:Request , res:Response) => {
        const {
            name,
            phone,
            email,
            country,
            address,
            checkInTime,
            checkOutTime,
            adults,
            childs,
            rooms,
        } = req.body;

        const booking = Booking.build({
            name,
            phone,
            email,
            country,
            address,
            checkInTime,
            checkOutTime,
            adults,
            childs,
            rooms,
        });

        await booking.save();

        res.status(201).send(booking);
    }
);


export { router as bookingRouter};