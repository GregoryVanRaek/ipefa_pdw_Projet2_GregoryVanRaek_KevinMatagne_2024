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
const personnel_controller_1 = require("./controller/personnel.controller");
const entity_1 = require("./model/entity");
const model_1 = require("../../common/model");
const typeorm_1 = require("@nestjs/typeorm");
const service_1 = require("./service");
;
let PersonnelModule = class PersonnelModule {
};
exports.PersonnelModule = PersonnelModule;
exports.PersonnelModule = PersonnelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.Employee, entity_1.Contract, model_1.Address])],
        controllers: [personnel_controller_1.PersonnelController],
        providers: [service_1.PersonnelService]
    })
], PersonnelModule);
//# sourceMappingURL=personnel.module.js.map