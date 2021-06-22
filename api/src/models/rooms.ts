import mongoose from "mongoose";
import { RoomRate, RoomType } from "./room_type";
import {AccommoDoc} from './accommodation';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface RoomAttrs {
    accommodation : string,
    singleRoom : number,
    doubleRoom : number,
    famillyRoom : number
}

interface RoomDoc extends mongoose.Document {
    accommodation: string,
    singleRoom : number,
    doubleRoom : number,
    famillyRoom : number
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
    singleRoom : {
        type: Number
    },
    doubleRoom : {
        type: Number
    },
    famillyRoom : {
        type: Number
    },
    
});

roomSchema.plugin(updateIfCurrentPlugin);

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};


const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema);

export { RoomDoc,roomSchema,Room };