import {ApiCodeResponse, ApiException} from "@common/api";

export class EmployeeCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.EMPLOYEE_CREATE_ERROR, 400);
    }
}

export class EmployeeDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.EMPLOYEE_DELETE_ERROR, 200);
    }
}

export class EmployeeNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.EMPLOYEE_NOT_FOUND, 200);
    }
}

export class EmployeeListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.EMPLOYEE_NOT_FOUND, 200);
    }
}

export class EmployeeUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.EMPLOYEE_UPDATE_ERROR, 400);
    }
}