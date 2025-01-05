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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
const ulid_1 = require("ulid");
const lodash_1 = require("lodash");
const model_1 = require("..");
const address_exception_1 = require("../../exception/address.exception");
let AddressService = class AddressService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(payload) {
        try {
            return await this.repository.save((0, builder_pattern_1.Builder)()
                .addressId(`${(0, ulid_1.ulid)()}`)
                .road(payload.road)
                .nb(payload.nb)
                .cp(payload.cp)
                .town(payload.town)
                .country(payload.country)
                .complement(payload.complement)
                .build());
        }
        catch (e) {
            throw new address_exception_1.AddressCreateException();
        }
    }
    async getAll() {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new address_exception_1.AddressListException();
        }
    }
    async getOneById(id) {
        const result = await this.repository.findOneBy({ addressId: id });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new address_exception_1.AddressNotFoundException();
    }
    async delete(id) {
        try {
            const toDelete = await this.getOneById(id);
            return await this.repository.remove(toDelete);
        }
        catch (e) {
            throw new address_exception_1.AddressDeleteException();
        }
    }
    async updateAddressIfNeeded(addressId, payload) {
        const existingAddress = await this.getOneById(addressId);
        let updated = false;
        if (existingAddress.road !== payload.road && !(0, lodash_1.isNil)(payload.road)) {
            existingAddress.road = payload.road;
            updated = true;
        }
        if (existingAddress.nb !== payload.nb && !(0, lodash_1.isNil)(payload.nb)) {
            existingAddress.nb = payload.nb;
            updated = true;
        }
        if (existingAddress.cp !== payload.cp && !(0, lodash_1.isNil)(payload.cp)) {
            existingAddress.cp = payload.cp;
            updated = true;
        }
        if (existingAddress.town !== payload.town && !(0, lodash_1.isNil)(payload.town)) {
            existingAddress.town = payload.town;
            updated = true;
        }
        if (existingAddress.country !== payload.country && !(0, lodash_1.isNil)(payload.country)) {
            existingAddress.country = payload.country;
            updated = true;
        }
        if (existingAddress.complement !== payload.complement && !(0, lodash_1.isNil)(payload.complement)) {
            existingAddress.complement = payload.complement;
            updated = true;
        }
        if (updated) {
            return await this.repository.save(existingAddress);
        }
        return existingAddress;
    }
    async getOrCreateAddress(payload) {
        if (payload.addressId) {
            return this.updateAddressIfNeeded(payload.addressId, payload);
        }
        else {
            const add = await this.repository.findOneBy({
                road: payload.road,
                nb: payload.nb,
                cp: payload.cp,
                town: payload.town,
                country: payload.country
            });
            if (add) {
                return this.updateAddressIfNeeded(add.addressId, payload);
            }
        }
        return this.create(payload);
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
//# sourceMappingURL=address.service.js.map