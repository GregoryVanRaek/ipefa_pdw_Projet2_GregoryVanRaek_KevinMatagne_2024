import { TokenService } from '../jwt';
import { Repository } from 'typeorm';
import { Credential, RefreshTokenPayload, SignInPayload, SignupPayload, Token } from '../model';
export declare class SecurityService {
    private readonly repository;
    private readonly tokenService;
    constructor(repository: Repository<Credential>, tokenService: TokenService);
    detail(id: string): Promise<Credential>;
    signIn(payload: SignInPayload): Promise<Token | null>;
    signup(payload: SignupPayload): Promise<Credential | null>;
    refresh(payload: RefreshTokenPayload): Promise<Token | null>;
    delete(id: string): Promise<void>;
    private getByUsername;
}
