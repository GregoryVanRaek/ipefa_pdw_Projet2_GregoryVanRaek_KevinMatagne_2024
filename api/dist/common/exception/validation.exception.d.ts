import { HttpException, ValidationError } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    constructor(errors: ValidationError[]);
}
