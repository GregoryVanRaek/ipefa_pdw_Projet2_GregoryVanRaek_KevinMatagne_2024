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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const model_1 = require("./model");
const metadata_1 = require("../common/metadata");
const swagger_1 = require("@nestjs/swagger");
let SecurityController = class SecurityController {
    constructor(service) {
        this.service = service;
    }
    signIn(payload) {
        return this.service.signIn(payload);
    }
    adminSignIn(payload) {
        return this.service.signIn(payload);
    }
    signUp(payload) {
        return this.service.signup(payload);
    }
    refresh(payload) {
        return this.service.refresh(payload);
    }
    me(user) {
        return user;
    }
    delete(id) {
        return this.service.delete(id);
    }
};
exports.SecurityController = SecurityController;
__decorate([
    (0, metadata_1.Public)(),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.SignInPayload]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "signIn", null);
__decorate([
    (0, metadata_1.Public)(),
    (0, common_1.Post)('admin-signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.SignInPayload]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "adminSignIn", null);
__decorate([
    (0, metadata_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.SignupPayload]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "signUp", null);
__decorate([
    (0, metadata_1.Public)(),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.RefreshTokenPayload]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, metadata_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.Credential]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "me", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "delete", null);
exports.SecurityController = SecurityController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiTags)('Account'),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [service_1.SecurityService])
], SecurityController);
//# sourceMappingURL=security.controller.js.map