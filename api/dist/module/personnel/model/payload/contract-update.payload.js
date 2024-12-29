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
exports.ContractUpdatePayload = void 0;
const entity_1 = require("../entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const api_1 = require("../../../../common/api");
class ContractUpdatePayload {
}
exports.ContractUpdatePayload = ContractUpdatePayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.CONTRACT_PAYLOAD_ID_IS_MANDATORY }),
    (0, class_validator_1.Length)(26, 26),
    __metadata("design:type", String)
], ContractUpdatePayload.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ContractUpdatePayload.prototype, "hourlyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 255, { message: api_1.ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_LENGTH_ERROR }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContractUpdatePayload.prototype, "perks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(undefined, { message: api_1.ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_NOT_VALID }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContractUpdatePayload.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", entity_1.Employee)
], ContractUpdatePayload.prototype, "employee", void 0);
//# sourceMappingURL=contract-update.payload.js.map