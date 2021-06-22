import express, { Request, Response } from 'express';
import { Accommodation } from '../models/accommodation';
import { accomodationRouter } from './accommodation';

const router = express.Router();

router.get('/api', async (req:Request , res:Response) => {
    res.send("Hello world");
});

export { router as index,accomodationRouter };