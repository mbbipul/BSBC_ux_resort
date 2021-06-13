import mongoose from "mongoose";
import { RoomType } from "./room_type";
import {AccommoDoc} from './accommodation';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface RoomAttrs {
    accommodation : AccommoDoc,
    type: RoomType,
}

interface RoomDoc extends mongoose.Document {
    accommodation: AccommoDoc,
    type: RoomType,
}

interface RoomModel extends mongoose.Model<RoomDoc> {
    build(attrs : RoomAttrs ) : RoomDoc
}

const roomSchema = new mongoose.Schema({
    accommodation: { 
        type: mongoose.Types.ObjectId,
        ref: 'Accommodation' 
    },
    type : {
        type: String,
        required: true,
        enum: Object.values(RoomType),
        default: RoomType.Double
    }
});

roomSchema.plugin(updateIfCurrentPlugin);

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};


const Room = mongoose.model<RoomDoc, RoomModel>('Rooms', roomSchema);

export { RoomDoc,Room };