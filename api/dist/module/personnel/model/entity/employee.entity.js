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
exports.Employee = void 0;
const entity_1 = require("../../../../common/model/entity");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const model_1 = require("../../../../common/model");
const contract_entity_1 = require("./contract.entity");
let Employee = class Employee extends entity_1.BaseEntity {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, unique: false }),
    __metadata("design:type", String)
], Employee.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false, unique: false }),
    __metadata("design:type", String)
], Employee.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: true, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 34, nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "iban", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: model_1.UserRoleEnum, default: model_1.UserRoleEnum.Employee }),
    __metadata("design:type", Number)
], Employee.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entity_1.Address, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: 'addressId', name: 'address_id_fk' }),
    __metadata("design:type", entity_1.Address)
], Employee.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contract_entity_1.Contract, (c) => c.employee, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Employee.prototype, "employeeContracts", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)()
], Employee);
//# sourceMappingURL=employee.entity.js.map