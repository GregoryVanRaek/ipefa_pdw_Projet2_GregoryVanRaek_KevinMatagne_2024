import { ApiException } from "@common/api";
export declare class EmployeeCreateException extends ApiException {
    error: any;
    constructor(error: any);
}
export declare class EmployeeDeleteException extends ApiException {
    constructor();
}
export declare class EmployeeNotFoundException extends ApiException {
    constructor();
}
export declare class EmployeeListException extends ApiException {
    constructor();
}
export declare class EmployeeUpdateException extends ApiException {
    error: any;
    constructor(error: any);
}
export declare class ConstraintError {
    errors: any;
    constructor(error: any);
    static getErrorMessage(error: any): string[];
}
