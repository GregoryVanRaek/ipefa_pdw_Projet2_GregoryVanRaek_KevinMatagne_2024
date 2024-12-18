import { computed, effect, EffectRef, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ApiService, CredentialUtils, SignInPayload, SignupPayload, TokenService } from '@shared/api';
import { Router } from '@angular/router';
import { ApiResponse } from '@shared/api/api.response';
import { Observable, tap } from 'rxjs';
import { AppNode, AppRoutes } from '../../../common';
import { ApiURI } from '@shared/api/data/enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private api :ApiService = inject(ApiService);
  private tokenService :TokenService = inject(TokenService);
  public isAuthenticated$: Signal<boolean> = computed(() => !this.tokenService.token$().isEmpty);
  public account$ :WritableSignal<Credential> = signal(CredentialUtils.getEmpty());
  private isAuthenticatedHandler :EffectRef = effect( () => this.handleAuthenticatedChange(this.isAuthenticated$()));
  private router :Router = inject(Router);

  signIn(payload :SignInPayload): Observable<ApiResponse>{
    return this.api.post(ApiURI.SIGN_IN, payload).pipe(
      tap( (response :ApiResponse) => {
        if(response.result){
          this.tokenService.setToken({
            token :response.data.token,
            refreshToken : response.data.refreshToken,
            isEmpty : false
          })
        }
        else{
          console.log(response.result);
        }
      })
    );
  }

  signUp(payload :SignupPayload): Observable<ApiResponse>{
    return this.api.post(ApiURI.SIGN_UP, payload);
  }

  logOut() :void{
    this.tokenService.setToken(this.tokenService.getEmpty());
  }

  private handleAuthenticatedChange(isAuthenticated :boolean):void{
    if(isAuthenticated){
      console.log("is authenticated", isAuthenticated, this.tokenService.token$());
      this.api.get(ApiURI.ME).pipe(
        tap((response :ApiResponse) => {
          if(response.result){
            this.account$.set(CredentialUtils.fromDto(response.data));

            if(!window.location.pathname.startsWith(`/${AppNode.REDIRECT_TO_AUTHENTICATED}`)){
              this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
            }

            return;
          }
          this.router.navigate([AppRoutes.PUBLIC]).then();
        })).subscribe();
      return;
    }
    this.router.navigate([AppRoutes.PUBLIC]).then();
  }

}
