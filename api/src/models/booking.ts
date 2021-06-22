import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { RoomDoc } from './rooms';

enum BookingStatus {
    Pending = 'Pending',
    Booked = 'Booked',
    Cancell = 'Cancell'
}

interface BookingAttrs {
    name : string ,
    phone: string,
    email: string,
    country: string,
    address: string,
    checkInTime: string,
    checkOutTime: string,
    adults: number,
    childs: number,
    rooms: [string],
}

interface BookingDoc extends mongoose.Document {
    name : string ,
    phone: string,
    email: string,
    country: string,
    address: string,
    checkInTime: string,
    checkOutTime: string,
    adults: number,
    childs: number,
    rooms: [string],
}

interface BookingModel extends mongoose.Model<BookingDoc> {
    build(attr: BookingAttrs) : BookingDoc
}

const bookingSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    } ,
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    checkInTime: {
        type: String,
        required: true,
    },
    checkOutTime: {
        type: String,
        required: true,
    },
    adults: {
        type: Number,
        required: true
    },
    childs: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(BookingStatus),
        default: BookingStatus.Pending
    },
    rooms: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Room' ,
        required: true
    }],
});


bookingSchema.plugin(updateIfCurrentPlugin);

bookingSchema.statics.build = (attrs: BookingAttrs) => {
  return new Booking(attrs);
};

const Booking = mongoose.model<BookingDoc, BookingModel>('Booking', bookingSchema);

export { BookingDoc,BookingStatus,Booking };