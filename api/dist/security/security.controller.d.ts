import { SecurityService } from './service';
import { RefreshTokenPayload, SignInPayload, SignupPayload, Credential, Token } from './model';
export declare class SecurityController {
    private readonly service;
    constructor(service: SecurityService);
    signIn(payload: SignInPayload): Promise<Token>;
    adminSignIn(payload: SignInPayload): Promise<Token>;
    signUp(payload: SignupPayload): Promise<Credential>;
    refresh(payload: RefreshTokenPayload): Promise<Token> | null;
    me(user: Credential): Credential;
    delete(id: string): Promise<void>;
}
