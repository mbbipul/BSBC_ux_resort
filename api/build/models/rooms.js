"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.roomSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_update_if_current_1 = require("mongoose-update-if-current");
var roomSchema = new mongoose_1.default.Schema({
    accommodation: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Accommodation',
        required: true,
    },
    singleRoom: {
        type: Number
    },
    doubleRoom: {
        type: Number
    },
    famillyRoom: {
        type: Number
    },
});
exports.roomSchema = roomSchema;
roomSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
roomSchema.statics.build = function (attrs) {
    return new Room(attrs);
};
var Room = mongoose_1.default.model('Room', roomSchema);
exports.Room = Room;
//# sourceMappingURL=rooms.js.map