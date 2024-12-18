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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("../jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const security_exception_1 = require("../security.exception");
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const model_1 = require("../model");
const builder_pattern_1 = require("builder-pattern");
const enum_1 = require("../model/enum");
const ulid_1 = require("ulid");
let SecurityService = class SecurityService {
    constructor(repository, tokenService) {
        this.repository = repository;
        this.tokenService = tokenService;
    }
    async detail(id) {
        const result = await this.repository.findOneBy({ credential_id: id });
        if (!(0, lodash_1.isNil)(result)) {
            return result;
        }
        throw new security_exception_1.UserNotFoundException();
    }
    async signIn(payload) {
        const result = await this.getByUsername(payload.username, enum_1.GetUsernamePossibility.SIGN_IN);
        if (await (0, utils_1.comparePassword)(payload.password, result.password)) {
            return this.tokenService.getTokens(result);
        }
        throw new security_exception_1.UserNotFoundException();
    }
    async signup(payload) {
        const result = await this.getByUsername(payload.username, enum_1.GetUsernamePossibility.SIGN_UP);
        try {
            const encryptedPassword = await (0, utils_1.encryptPassword)(payload.password);
            return this.repository.save((0, builder_pattern_1.Builder)()
                .username(payload.username)
                .password(encryptedPassword)
                .mail(payload.mail)
                .credential_id(`${(0, ulid_1.ulid)()}`)
                .build());
        }
        catch (e) {
            throw new security_exception_1.SignupException();
        }
    }
    async refresh(payload) {
        return this.tokenService.refresh(payload);
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new security_exception_1.CredentialDeleteException();
        }
    }
    async getByUsername(username, possibility) {
        const result = await this.repository.findOneBy({
            username,
        });
        switch (possibility) {
            case enum_1.GetUsernamePossibility.SIGN_IN:
                if ((0, lodash_1.isNil)(result)) {
                    throw new security_exception_1.UserNotFoundException();
                }
                return result;
            case enum_1.GetUsernamePossibility.SIGN_UP:
                if (!(0, lodash_1.isNil)(result)) {
                    throw new security_exception_1.UserAlreadyExistException();
                }
                return result;
        }
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(model_1.Credential)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.TokenService])
], SecurityService);
//# sourceMappingURL=security.service.js.map