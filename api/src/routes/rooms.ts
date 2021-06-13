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
    const rooms = await Room.find({}).populate('Accommodations');

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
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { accommodationId,type } = req.body;
        const accommodation = await Accommodation.findById(accommodationId);

        console.log(accommodation);
        
        if(!accommodation) {
            throw new NotFoundError();
        }

        const room = Room.build({
            accommodation: accommodation,
            type: type
        });

        await room.save();
        res.status(201).send(room);
    }
);

export { router as roomRouter };
