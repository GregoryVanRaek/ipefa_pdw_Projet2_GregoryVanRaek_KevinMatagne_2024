import { HttpException } from '@nestjs/common';
import { ApiCodeResponse } from './api-code.response';
export declare class ApiException extends HttpException {
    constructor(code: ApiCodeResponse, status: number);
}
