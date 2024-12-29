"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonnelModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const model_1 = require("./model");
const model_2 = require("../../common/model");
const typeorm_1 = require("@nestjs/typeorm");
const service_1 = require("./service");
const controller_2 = require("./controller");
;
let PersonnelModule = class PersonnelModule {
};
exports.PersonnelModule = PersonnelModule;
exports.PersonnelModule = PersonnelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([model_1.Employee, model_1.Contract, model_2.Address])],
        controllers: [controller_1.EmployeeController, controller_2.ContractController],
        providers: [service_1.EmployeeService, service_1.ContractService, model_2.AddressService]
    })
], PersonnelModule);
//# sourceMappingURL=personnel.module.js.map