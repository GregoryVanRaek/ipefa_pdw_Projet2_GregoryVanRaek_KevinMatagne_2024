import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { ApiService, TokenService } from '@shared/api';

export type AddTokenHeaderFn = (req: HttpRequest<any>, token: string,) => HttpRequest<any>;
export type HttpInterceptorHandlerFn = (error: HttpErrorResponse,req: HttpRequest<any>, next: HttpHandlerFn,
                                        tokenService:TokenService, router:Router,api: ApiService) => Observable<any>;
export type HttpInterceptorCommonErrorHandlerFn = (error: HttpErrorResponse)=> Observable<any>
