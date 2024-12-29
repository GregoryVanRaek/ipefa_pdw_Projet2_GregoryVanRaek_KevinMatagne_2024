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
exports.PersonnelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("../model");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
const ulid_1 = require("ulid");
const exception_1 = require("../exception");
const lodash_1 = require("lodash");
let PersonnelService = class PersonnelService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(payload) {
        try {
            return await this.repository.save((0, builder_pattern_1.Builder)()
                .employeeId(`${(0, ulid_1.ulid)()}`)
                .firstname(payload.firstname)
                .lastname(payload.lastname)
                .birthdate(payload.birthdate)
                .mail(payload.mail)
                .phone(payload.phone)
                .iban(payload.iban)
                .gender(payload.gender)
                .address(payload.address)
                .build());
        }
        catch (e) {
            throw new exception_1.EmployeeCreateException();
        }
    }
    async getAll() {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new exception_1.EmployeeListException();
        }
    }
    async getOneById(id) {
        const result = await this.repository.findOneBy({ employeeId: id });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new exception_1.EmployeeNotFoundException();
    }
    async getOneByName(name) {
        const result = await this.repository.findOneBy({ lastname: name });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new exception_1.EmployeeNotFoundException();
    }
    async getOneByEmail(email) {
        const result = await this.repository.findOneBy({ mail: email });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new exception_1.EmployeeNotFoundException();
    }
    async delete(id) {
        try {
            const toDelete = await this.getOneById(id);
            return await this.repository.remove(toDelete);
        }
        catch (e) {
            throw new exception_1.EmployeeDeleteException();
        }
    }
    async update(payload) {
        try {
            let toUpdate = await this.getOneById(payload.employeeId);
            toUpdate.firstname = payload.firstname;
            toUpdate.lastname = payload.lastname;
            toUpdate.birthdate = payload.birthdate;
            toUpdate.mail = payload.mail;
            toUpdate.phone = payload.phone;
            toUpdate.iban = payload.iban;
            toUpdate.gender = payload.gender;
            toUpdate.address = payload.address;
            return await this.repository.save(toUpdate);
        }
        catch (e) {
            throw new exception_1.EmployeeUpdateException();
        }
    }
};
exports.PersonnelService = PersonnelService;
exports.PersonnelService = PersonnelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PersonnelService);
//# sourceMappingURL=personnel.service.js.map