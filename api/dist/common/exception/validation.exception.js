"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const api_1 = require("../api");
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        console.log(errors);
        super({
            code: api_1.ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => Object.values(e.constraints)).flat(),
            result: false
        }, 499);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map