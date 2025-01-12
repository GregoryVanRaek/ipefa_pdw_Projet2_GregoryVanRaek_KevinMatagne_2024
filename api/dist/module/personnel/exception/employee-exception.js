"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstraintError = exports.EmployeeUpdateException = exports.EmployeeListException = exports.EmployeeNotFoundException = exports.EmployeeDeleteException = exports.EmployeeCreateException = void 0;
const api_1 = require("../../../common/api");
class EmployeeCreateException extends api_1.ApiException {
    constructor(error) {
        const errors = ConstraintError.getErrorMessage(error);
        super(api_1.ApiCodeResponse.EMPLOYEE_CREATE_ERROR, 400, errors);
        this.error = error;
    }
}
exports.EmployeeCreateException = EmployeeCreateException;
class EmployeeDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.EMPLOYEE_DELETE_ERROR, 200);
    }
}
exports.EmployeeDeleteException = EmployeeDeleteException;
class EmployeeNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.EMPLOYEE_NOT_FOUND, 200);
    }
}
exports.EmployeeNotFoundException = EmployeeNotFoundException;
class EmployeeListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.EMPLOYEE_NOT_FOUND, 200);
    }
}
exports.EmployeeListException = EmployeeListException;
class EmployeeUpdateException extends api_1.ApiException {
    constructor(error) {
        const errors = ConstraintError.getErrorMessage(error);
        super(api_1.ApiCodeResponse.EMPLOYEE_UPDATE_ERROR, 400, errors);
        this.error = error;
    }
}
exports.EmployeeUpdateException = EmployeeUpdateException;
class ConstraintError {
    constructor(error) {
        this.errors = error;
    }
    static getErrorMessage(error) {
        if (error.code === '23505') {
            if (error.constraint === 'UQ_81afb288b526f7e8fed0e4200cc') {
                return [api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_PHONE_ALREADY_EXISTS];
            }
            else if (error.constraint === 'UQ_180f208fe6dc002bff80928d43f') {
                return [api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_ALREADY_EXISTS];
            }
        }
        return [api_1.ApiCodeResponse.EMPLOYEE_CREATE_ERROR];
    }
}
exports.ConstraintError = ConstraintError;
//# sourceMappingURL=employee-exception.js.map