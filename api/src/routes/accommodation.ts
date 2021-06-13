import express, { Request, Response } from 'express';
import {Accommodation} from '../models/accommodation';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate_request';
import { NotFoundError } from '../errors/not_found_error';

const router = express.Router();

router.get('/api/accommodations', async (req:Request , res:Response) => {
    const accomodations = await Accommodation.find({});

    res.send(accomodations);
});

router.post('/api/accommodations',
    [
        body('title')
            .not()
            .isEmpty() 
            .isString()
            .withMessage('Title is required'),
        body('description')
            .not()
            .isEmpty()
            .isString()
            .withMessage('Description is required'),
    ],
    validateRequest,
    async (req:Request , res:Response) => {
        const {title,description} = req.body;

        const accommodation = Accommodation.build({
            title,
            description,
            coverImageUrl : 'image2',
            images : 'image'
        });

        await accommodation.save();

        res.status(201).send(accommodation);
    }
);

router.get('/api/accommodations/:id', async (req:Request , res:Response) => {
    const accommodations = await Accommodation.findById(req.params.id);

    if(!accommodations){
        throw new NotFoundError();
    }
    res.send(accommodations);
});

export { router as accomodationRouter };