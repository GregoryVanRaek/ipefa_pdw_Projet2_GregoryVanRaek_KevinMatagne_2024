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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const api_1 = require("../../api");
class AddressPayload {
}
exports.AddressPayload = AddressPayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(26, 26),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "addressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 255, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "road", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 8, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "nb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 10, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "cp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 50, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "town", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 50, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 255, { message: api_1.ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressPayload.prototype, "complement", void 0);
//# sourceMappingURL=address.payload.js.map