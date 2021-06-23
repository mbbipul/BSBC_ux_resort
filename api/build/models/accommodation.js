"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accommodation = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_update_if_current_1 = require("mongoose-update-if-current");
var accommoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    singleRoom: {
        type: Number,
        required: true
    },
    doubleRoom: {
        type: Number,
        required: true
    },
    famillyRoom: {
        type: Number,
        required: true
    }
});
accommoSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
accommoSchema.statics.build = function (attrs) {
    return new Accommodation(attrs);
};
var Accommodation = mongoose_1.default.model('Accommodation', accommoSchema);
exports.Accommodation = Accommodation;
//# sourceMappingURL=accommodation.js.map