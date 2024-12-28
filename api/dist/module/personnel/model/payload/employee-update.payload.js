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
exports.EmployeeUpdatePayloads = void 0;
const model_1 = require("../../../../common/model");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const api_1 = require("../../../../common/api");
class EmployeeUpdatePayloads {
}
exports.EmployeeUpdatePayloads = EmployeeUpdatePayloads;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_ID_IS_MANDATORY }),
    (0, class_validator_1.Length)(26, 26, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_ID_LENGTH_ERROR }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 255, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_LENGTH_ERROR }),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_IS_MANDATORY }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_IS_NOT_STRING }),
    (0, class_validator_1.Length)(0, 255, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_LENGTH_ERROR }),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_IS_MANDATORY }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_BIRTHDATE_IS_NOT_VALID }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], EmployeeUpdatePayloads.prototype, "birthdate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(undefined, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_IS_NOT_VALID }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 50, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_LENGTH_ERROR }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 30, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_PHONE_LENGTH_ERROR }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 34, { message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_IBAN_LENGTH_ERROR }),
    (0, class_validator_1.IsIBAN)({ message: api_1.ApiCodeResponse.EMPLOYEE_PAYLOAD_IBAN_IS_NOT_VALID }),
    __metadata("design:type", String)
], EmployeeUpdatePayloads.prototype, "iban", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", model_1.Address)
], EmployeeUpdatePayloads.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], EmployeeUpdatePayloads.prototype, "contracts", void 0);
//# sourceMappingURL=employee-update.payload.js.map