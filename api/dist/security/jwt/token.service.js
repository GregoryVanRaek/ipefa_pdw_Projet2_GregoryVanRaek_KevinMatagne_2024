"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("../model");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../common/config");
const builder_pattern_1 = require("builder-pattern");
const security_exception_1 = require("../security.exception");
const ulid_1 = require("ulid");
let TokenService = TokenService_1 = class TokenService {
    constructor(repository, credentialRepository, jwtService) {
        this.repository = repository;
        this.credentialRepository = credentialRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(TokenService_1.name);
    }
    async getTokens(credential) {
        try {
            await this.repository.delete({ credential });
            const payload = { sub: credential.credential_id };
            const token = await this.jwtService.signAsync(payload, {
                secret: config_1.configManager.getValue(config_1.ConfigKey.JWT_TOKEN_SECRET),
                expiresIn: config_1.configManager.getValue(config_1.ConfigKey.JWT_TOKEN_EXPIRE_IN)
            });
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: config_1.configManager.getValue(config_1.ConfigKey.JWT_REFRESH_TOKEN_SECRET),
                expiresIn: config_1.configManager.getValue(config_1.ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN)
            });
            await this.repository.upsert((0, builder_pattern_1.Builder)()
                .token(token)
                .refreshToken(refreshToken)
                .credential(credential)
                .token_id(`${(0, ulid_1.ulid)()}`)
                .build(), ['credential']);
            return this.repository.findOneBy({ token: token });
        }
        catch (e) {
            this.logger.error(e.message);
            throw new security_exception_1.TokenGenerationException();
        }
    }
    async deleteFor(credential) {
        await this.repository.delete({ credential });
    }
    async refresh(payload) {
        try {
            const id = this.jwtService.verify(payload.refresh, { secret: config_1.configManager.getValue(config_1.ConfigKey.JWT_REFRESH_TOKEN_SECRET) }).sub;
            const credential = await this.credentialRepository.findOneBy({ credential_id: id });
            return await this.getTokens(credential);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new security_exception_1.TokenExpiredException();
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = TokenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Token)),
    __param(1, (0, typeorm_1.InjectRepository)(model_1.Credential)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map