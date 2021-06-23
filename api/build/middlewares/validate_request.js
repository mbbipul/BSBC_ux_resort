"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var express_validator_1 = require("express-validator");
var request_validate_error_1 = require("../errors/request_validate_error");
var validateRequest = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new request_validate_error_1.RequestValidationError(errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate_request.js.map