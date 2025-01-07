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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("../model");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
const ulid_1 = require("ulid");
const exception_1 = require("../exception");
const lodash_1 = require("lodash");
let ContractService = class ContractService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(payload) {
        try {
            return await this.repository.save((0, builder_pattern_1.Builder)()
                .contractId(`${(0, ulid_1.ulid)()}`)
                .salary(payload.salary)
                .perks(payload.perks)
                .startDate(payload.startDate)
                .endDate(payload.endDate)
                .contractType(payload.contractType)
                .weeklySchedule(payload.weeklySchedule)
                .employee(payload.employee)
                .build());
        }
        catch (error) {
            throw new exception_1.ContractCreateException();
        }
    }
    async getAll() {
        try {
            return await this.repository.find();
        }
        catch (error) {
            throw new exception_1.ContractListException();
        }
    }
    async getOneById(id) {
        try {
            const result = await this.repository.findOneBy({ contractId: id });
            if (!((0, lodash_1.isNil)(result))) {
                return result;
            }
        }
        catch (error) {
            throw new exception_1.ContractNotFoundException();
        }
    }
    async delete(id) {
        try {
            const toDelete = await this.getOneById(id);
            if (!(0, lodash_1.isNil)(toDelete)) {
                return await this.repository.remove(toDelete);
            }
        }
        catch (error) {
            throw new exception_1.ContractDeleteException();
        }
    }
    async update(payload) {
        try {
            const toUpdate = await this.getOneById(payload.contractId);
            toUpdate.salary = payload.salary;
            toUpdate.perks = payload.perks;
            toUpdate.startDate = payload.startDate;
            toUpdate.endDate = payload.endDate;
            toUpdate.contractType = payload.contractType;
            toUpdate.weeklySchedule = payload.weeklySchedule;
            return await this.repository.save(toUpdate);
        }
        catch (error) {
            throw new exception_1.ContractUpdateException();
        }
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContractService);
//# sourceMappingURL=contract.service.js.map