// Gestion des erreurs au niveau de l'application
import { HttpException } from '@nestjs/common';
import {ApiCodeResponse} from './api-code.response';

export class ApiException extends HttpException{
  constructor(code:ApiCodeResponse, status:number, errors:string[] = null) {
    super({
      code: code,
      data: null,
      result: false,
      errors
    }, status);
  }
}
