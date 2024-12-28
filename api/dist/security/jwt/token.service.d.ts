import { Credential, RefreshTokenPayload, Token } from '../model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly repository;
    private readonly credentialRepository;
    private jwtService;
    private readonly logger;
    constructor(repository: Repository<Token>, credentialRepository: Repository<Credential>, jwtService: JwtService);
    getTokens(credential: Credential): Promise<Token>;
    deleteFor(credential: Credential): Promise<void>;
    refresh(payload: RefreshTokenPayload): Promise<Token>;
}
