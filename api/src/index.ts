import mongoose from 'mongoose';

import { app } from './app';

const uri = "mongodb+srv://bipul:Ypdx@XXDY7Kcs87@cluster0.3aryl.mongodb.net/kolpona_islands?retryWrites=true&w=majority";

const start = async () => {
    try {
        await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Connected to MongoDb');
    } catch (error) {
        console.error(error);
    }

    app.listen(3002, () => {
		console.log('Listening on port 3000!!!!!!!!');
	});

}

start();