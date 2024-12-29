"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUpdateException = exports.EmployeeListException = exports.EmployeeNotFoundException = exports.EmployeeDeleteException = exports.EmployeeCreateException = void 0;
const api_1 = require("../../../common/api");
class EmployeeCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.EMPLOYEE_CREATE_ERROR, 400);
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
    constructor() {
        super(api_1.ApiCodeResponse.EMPLOYEE_UPDATE_ERROR, 400);
    }
}
exports.EmployeeUpdateException = EmployeeUpdateException;
//# sourceMappingURL=employee-exception.js.map