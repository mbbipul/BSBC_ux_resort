import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { RoomDoc } from './rooms';

interface AccommoAttrs {
    title :  string,
    coverImageUrl: string,
    description: string,
    images: string,
}

interface AccommoDoc extends mongoose.Document {
    title :  string,
    coverImageUrl: string,
    description: string,
    images: [String],
    rooms: [RoomDoc]
}

interface AccommoModel extends mongoose.Model<AccommoDoc> {
    build(attrs : AccommoAttrs) : AccommoDoc
}

const accommoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    rooms: [{
        type: mongoose.Types.ObjectId,
        ref: 'Rooms'
    }]
});

accommoSchema.plugin(updateIfCurrentPlugin);

accommoSchema.statics.build = (attrs: AccommoAttrs) => {
  return new Accommodation(attrs);
};

const Accommodation = mongoose.model<AccommoDoc, AccommoModel>('Accommodations', accommoSchema);

export { AccommoDoc,Accommodation };