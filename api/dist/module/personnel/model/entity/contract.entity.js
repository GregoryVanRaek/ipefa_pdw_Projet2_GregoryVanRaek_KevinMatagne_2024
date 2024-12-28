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
exports.Contract = void 0;
const typeorm_1 = require("typeorm");
const model_1 = require("../../../../common/model");
const ulid_1 = require("ulid");
const employee_entity_1 = require("./employee.entity");
let Contract = class Contract extends model_1.BaseEntity {
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Contract.prototype, "contractId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: false }),
    __metadata("design:type", Number)
], Contract.prototype, "hourlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true, unique: false }),
    __metadata("design:type", String)
], Contract.prototype, "perks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Contract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.employeeContracts, { eager: false }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: 'employeeId', name: 'employeeId_fk' }),
    __metadata("design:type", employee_entity_1.Employee)
], Contract.prototype, "employee", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)()
], Contract);
//# sourceMappingURL=contract.entity.js.map