import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ux_resort_v4", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Connected to MongoDb');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
		console.log('Listening on port 3000!!!!!!!!');
	});

}

start();