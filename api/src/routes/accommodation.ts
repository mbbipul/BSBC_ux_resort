import express, { Request, Response } from 'express';
import {Accommodation} from '../models/accommodation';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate_request';
import { NotFoundError } from '../errors/not_found_error';
import * as _ from "lodash"

const router = express.Router();

router.get('/api/accommodations', async (req:Request , res:Response) => {
    const accomodations = await Accommodation.aggregate([
        { 
            $lookup: {
                from: "rooms", 
                localField: "_id", 
                foreignField: "accommodation",
                as: 'accommodationDoc'
            },
        },
    ]).exec();
    
    accomodations.map((v: any) => (
        v.accommodationDoc = _.groupBy(v.accommodationDoc,"type")
    ));

    res.send(accomodations);
});

router.get('/api/accommodations/count', async (req:Request , res:Response) => {
    const count = await Accommodation.countDocuments({});
    const accomodations = await Accommodation.find({});
    
    res.send({count,accomodations});
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

        const isAccommodationExists = await Accommodation.findOne({title});

        if(!isAccommodationExists){
            const accommodation = Accommodation.build({
                title,
                description,
                coverImageUrl : 'image2',
                images : 'image'
            });
    
            await accommodation.save();
    
            res.status(201).send(accommodation);
        }else{
            res.status(409).send(title+" Already Exists!");
        }
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