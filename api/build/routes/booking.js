"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var booking_1 = require("../models/booking");
var accommodation_1 = require("../models/accommodation");
var validate_request_1 = require("../middlewares/validate_request");
var linq_1 = require("../utils/linq");
var rooms_1 = require("../models/rooms");
var router = express_1.default.Router();
exports.bookingRouter = router;
router.get('/api/booking', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var booking;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, booking_1.Booking.aggregate([
                    {
                        $lookup: {
                            from: "rooms",
                            localField: "rooms",
                            foreignField: "_id",
                            as: 'rooms'
                        },
                    },
                ]).exec()];
            case 1:
                booking = _a.sent();
                res.send(booking);
                return [2 /*return*/];
        }
    });
}); });
router.get('/api/booking/room-available/:checkInTime-:checkOutTime', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, checkInTime, checkOutTime, bookingRoom, data, rooms, roomIds, accoommodationIds, accomodations;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, checkInTime = _a.checkInTime, checkOutTime = _a.checkOutTime;
                return [4 /*yield*/, booking_1.Booking.find().populate('rooms').exec()];
            case 1:
                bookingRoom = _b.sent();
                data = bookingRoom.filter(function (d) { return linq_1.checkDateInRange(linq_1.getDateShortString(d.checkInTime), linq_1.getDateShortString(d.checkOutTime), linq_1.getDateShortString(checkInTime)) || linq_1.checkDateInRange(linq_1.getDateShortString(d.checkInTime), linq_1.getDateShortString(d.checkOutTime), linq_1.getDateShortString(checkOutTime)); });
                // console.log(bookingRoom)
                console.log(data);
                rooms = data.map(function (_a) {
                    var rooms = _a.rooms;
                    return rooms;
                });
                roomIds = linq_1.flattArr(rooms);
                accoommodationIds = roomIds.map(function (_a) {
                    var accommodation = _a.accommodation;
                    return accommodation;
                });
                return [4 /*yield*/, accommodation_1.Accommodation.find({ '_id': { $in: accoommodationIds } })];
            case 2:
                accomodations = _b.sent();
                res.send(accomodations);
                return [2 /*return*/];
        }
    });
}); });
router.post('/api/booking', [
    express_validator_1.body('name')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Name is required'),
    express_validator_1.body('phone')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Phone is required'),
    express_validator_1.body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    express_validator_1.body('address')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Address is required'),
    express_validator_1.body('checkInTime')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Checkin Time is required'),
    express_validator_1.body('checkOutTime')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Checkout Time is required'),
    express_validator_1.body('rooms')
        .isArray()
        .withMessage("Rooms must be an array")
        .custom(function (input) { return input.length > 0; })
        .withMessage("At least one room is required")
], validate_request_1.validateRequest, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, phone, email, address, checkInTime, checkOutTime, rooms, roomsId, roomsObj, roomIds, booking;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, phone = _a.phone, email = _a.email, address = _a.address, checkInTime = _a.checkInTime, checkOutTime = _a.checkOutTime, rooms = _a.rooms;
                roomsId = [];
                rooms.map(function (v) {
                });
                return [4 /*yield*/, rooms_1.Room.insertMany(rooms)];
            case 1:
                roomsObj = _b.sent();
                roomIds = [];
                roomsObj.map(function (v) { return roomIds.push(v._id); });
                booking = booking_1.Booking.build({
                    name: name,
                    phone: phone,
                    email: email,
                    address: address,
                    checkInTime: checkInTime,
                    checkOutTime: checkOutTime,
                    rooms: roomIds,
                });
                return [4 /*yield*/, booking.save()];
            case 2:
                _b.sent();
                res.status(201).send(booking);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=booking.js.map