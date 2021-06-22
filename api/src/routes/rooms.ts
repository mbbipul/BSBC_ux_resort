import express, { Request, Response } from 'express';
import { Room } from '../models/rooms';
import { body } from 'express-validator';
import mongoose from "mongoose";
import { RoomType } from '../models/room_type';
import { Accommodation } from '../models/accommodation';
import { NotFoundError } from '../errors/not_found_error';
import { validateRequest } from '../middlewares/validate_request';

const router = express.Router();

router.get('/api/rooms', async (req:Request , res:Response) => {
    const rooms = await Room.find({});

    res.send(rooms);
});

router.get('/api/rooms/count', async (req:Request , res:Response) => {
    const rooms = await Room.countDocuments({});

    res.send({rooms});
});

router.get('/api/rooms/count-by-type', async (req:Request , res:Response) => {
    const rooms = await Room.aggregate([
        {
            $group : {
                _id : "$type", 
                count : {
                    $sum : 1
                }
            }
        }
    ])

    res.send({rooms});
});

router.get('/api/rooms/count-by-accommodations', async (req:Request , res:Response) => {
    const rooms = await Room.aggregate([
        { 
            $lookup: {
                from: "accommodations", 
                localField: "accommodation", 
                foreignField: "_id",
                as: 'accommodationDoc'
            }
        },
        {
            $group : {
                _id : "$accommodation", 
                count : {
                    $sum : 1
                },
                "room":{"$first":"$$ROOT"}
            }
        },
        { 
            $project: { 
                "accommodationDoc": { "$arrayElemAt": [ "$room.accommodationDoc", 0 ] }
            } 
        } 
    ]).exec();

    res.send(rooms);
});

router.post('/api/rooms',
    [
        body('accommodationId')
            .not()
            .isEmpty() 
            .custom((input : string) => mongoose.Types.ObjectId.isValid(input)) 
            .withMessage('Valid Accommodation Id must be provided'),
        body('type')
            .not()
            .isEmpty()
            .custom((input : string) => input in RoomType) 
            .withMessage('Room type is not valid'),
        body('roomRate')
            .not()
            .isEmpty()
            .withMessage('Room rate must be provide')
            .isNumeric() 
            .withMessage('Room rate must be numeric')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { accommodationId,type,roomRate } = req.body;
        const accommodation = await Accommodation.findById(accommodationId);

        
        if(!accommodation) {
            throw new NotFoundError();
        }

        const room = Room.build({
            accommodation: accommodation._id,
            type: type,
            roomRate: roomRate
        });

        await room.save();
        res.status(201).send(room);
    }
);

export { router as roomRouter };
