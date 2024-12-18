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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const ulid_1 = require("ulid");
let Address = class Address extends base_entity_1.BaseEntity {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Address.prototype, "address_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "road", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8, nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "nb", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "cp", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "town", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: false }),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);
//# sourceMappingURL=address.entity.js.map