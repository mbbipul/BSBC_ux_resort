import mongoose from "mongoose";
import { RoomRate, RoomType } from "./room_type";
import {AccommoDoc} from './accommodation';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface RoomAttrs {
    accommodation : string,
    type: RoomType,
    roomRate: number,
}

interface RoomDoc extends mongoose.Document {
    accommodation: string,
    type: RoomType,
    roomRate: number,
}

interface RoomModel extends mongoose.Model<RoomDoc> {
    build(attrs : RoomAttrs ) : RoomDoc
}

const roomSchema = new mongoose.Schema({
    accommodation: { 
        type: mongoose.Types.ObjectId,
        ref: 'Accommodation' ,
        required: true,
    },
    type : {
        type: String,
        required: true,
        enum: Object.values(RoomType),
    },
    roomRate : {
        type: Number,
        required: true,
        enum: Object.values(RoomRate),
    }
    
});

roomSchema.plugin(updateIfCurrentPlugin);

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};


const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema);

export { RoomDoc,roomSchema,Room };