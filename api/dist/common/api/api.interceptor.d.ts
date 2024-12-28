import { ApiCodeResponse } from '@common/api/api-code.response';
import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class ApiInterceptor implements NestInterceptor {
    private readonly logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    map(path: String): ApiCodeResponse;
}
