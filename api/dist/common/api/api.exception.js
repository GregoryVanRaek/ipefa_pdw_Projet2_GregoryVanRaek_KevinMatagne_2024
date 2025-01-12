"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
class ApiException extends common_1.HttpException {
    constructor(code, status, errors = null) {
        super({
            code: code,
            data: null,
            result: false,
            errors
        }, status);
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map