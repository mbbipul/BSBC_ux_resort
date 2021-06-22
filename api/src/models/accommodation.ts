import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { RoomDoc } from './rooms';

interface AccommoAttrs {
    title :  string,
    description: string,
    singleRoom : number,
    doubleRoom : number,
    famillyRoom : number
}

interface AccommoDoc extends mongoose.Document {
    title :  string,
    description: string,
    singleRoom : number,
    doubleRoom : number,
    famillyRoom : number
}

interface AccommoModel extends mongoose.Model<AccommoDoc> {
    build(attrs : AccommoAttrs) : AccommoDoc
}

const accommoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    singleRoom : {
        type: Number,
        required: true
    },
    doubleRoom : {
        type: Number,
        required: true
    },
    famillyRoom : {
        type: Number,
        required: true
    }
});

accommoSchema.plugin(updateIfCurrentPlugin);

accommoSchema.statics.build = (attrs: AccommoAttrs) => {
  return new Accommodation(attrs);
};

const Accommodation = mongoose.model<AccommoDoc, AccommoModel>('Accommodation', accommoSchema);

export { AccommoDoc,Accommodation,AccommoAttrs };