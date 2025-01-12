import {ApiCodeResponse, ApiException} from "@common/api";

export class EmployeeCreateException extends ApiException {
    constructor(public error: any) {
        const errors = ConstraintError.getErrorMessage(error);
        super(ApiCodeResponse.EMPLOYEE_CREATE_ERROR, 400, errors);
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
    constructor(public error:any) {
        const errors = ConstraintError.getErrorMessage(error);
        super(ApiCodeResponse.EMPLOYEE_UPDATE_ERROR, 400, errors);
    }
}

export class ConstraintError{
    errors :any;
    constructor(error:any) {
        this.errors = error;
    }
    static getErrorMessage(error: any): string[] {
        if (error.code === '23505') {
            if (error.constraint === 'UQ_81afb288b526f7e8fed0e4200cc') {
                return [ApiCodeResponse.EMPLOYEE_PAYLOAD_PHONE_ALREADY_EXISTS];
            } else if (error.constraint === 'UQ_180f208fe6dc002bff80928d43f') {
                return [ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_ALREADY_EXISTS];
            }
        }

        return [ApiCodeResponse.EMPLOYEE_CREATE_ERROR];
    }
}