import { ApiCodeResponse } from '@common/api/api-code.response';
import { isNil } from 'lodash';
import { ConfigKey, configManager } from '@common/config';
import { Observable, map } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ApiInterceptor implements NestInterceptor { // permet de reformater la sortie et de renvoyer une api response
  private readonly logger = new Logger(ApiInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const path = ctx.getRequest().route.path;
    return next
      .handle()
      .pipe(
        map((response: any) => {
          return {code: this.map(path), data: instanceToPlain(response), result: true} // instancetoplain utilise la libraire permettant d'interpreter les décorateur (ici permet de ne pas renvoyer le password)
        })
      );
  }

  map(path: String): ApiCodeResponse {
    this.logger.log(`path ${path}`);
    const part = path
      .replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
      .split('/')
      .filter(s => s.length > 0)
      .slice(0, 2)
      .map(s => s.toUpperCase());
    const code = ApiCodeResponse[`${part.join('_')}_SUCCESS` as keyof typeof ApiCodeResponse];
    return isNil(code) ? ApiCodeResponse.COMMON_SUCCESS : code;
  }
}