"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.BookingStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_update_if_current_1 = require("mongoose-update-if-current");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["Pending"] = "Pending";
    BookingStatus["Booked"] = "Booked";
    BookingStatus["Cancell"] = "Cancell";
})(BookingStatus || (BookingStatus = {}));
exports.BookingStatus = BookingStatus;
var bookingSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
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
    status: {
        type: String,
        required: true,
        enum: Object.values(BookingStatus),
        default: BookingStatus.Pending
    },
    rooms: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Room',
            required: true
        }],
});
bookingSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
bookingSchema.statics.build = function (attrs) {
    return new Booking(attrs);
};
var Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.Booking = Booking;
//# sourceMappingURL=booking.js.map