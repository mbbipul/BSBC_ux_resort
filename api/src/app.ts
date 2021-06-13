  
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {index,accomodationRouter,roomRouter} from './routes/index';
import { NotFoundError } from './errors/not_found_error';
import { errorHandler } from './middlewares/error_handler';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(index);
app.use(accomodationRouter);
app.use(roomRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});
  
app.use(errorHandler);

export { app };