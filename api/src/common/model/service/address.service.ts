import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Builder} from "builder-pattern";
import {ulid} from "ulid";
import {isNil} from "lodash";
import {Address, AddressPayload} from "@common/model";
import {
    AddressCreateException, AddressDeleteException,
    AddressListException,
    AddressNotFoundException, AddressUpdateException
} from "@common/exception/address.exception";

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private readonly repository: Repository<Address>) {}

    async create(payload: AddressPayload): Promise<Address>{
        try {
            return await this.repository.save(Builder<Address>()
                .addressId(`${ulid()}`)
                .road(payload.road)
                .nb(payload.nb)
                .cp(payload.cp)
                .town(payload.town)
                .country(payload.country)
                .complement(payload.complement)
                .build()
            );
        } catch (e) {
            throw new AddressCreateException();
        }
    }

    async getAll(): Promise<Address[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new AddressListException();
        }
    }

    async getOneById(id: string): Promise<Address> {
        const result = await this.repository.findOneBy({ addressId: id });
        if (!(isNil(result))) {
            return result;
        }
        throw new AddressNotFoundException();
    }

    async delete(id: string): Promise<Address> {
        try {
            const toDelete = await this.getOneById(id);
            return await this.repository.remove(toDelete);
        } catch (e) {
            throw new AddressDeleteException();
        }
    }

    // vérifie si l'adresse a été modifiée et quel champs doit être modifié en db
    async updateAddressIfNeeded(addressId: string, payload: AddressPayload): Promise<Address> {
        const existingAddress = await this.getOneById(addressId);
        let updated = false;

        if (existingAddress.road !== payload.road && !isNil(payload.road)) {
            existingAddress.road = payload.road;
            updated = true;
        }
        if (existingAddress.nb !== payload.nb && !isNil(payload.nb)) {
            existingAddress.nb = payload.nb;
            updated = true;
        }
        if (existingAddress.cp !== payload.cp && !isNil(payload.cp)) {
            existingAddress.cp = payload.cp;
            updated = true;
        }
        if (existingAddress.town !== payload.town && !isNil(payload.town)) {
            existingAddress.town = payload.town;
            updated = true;
        }
        if (existingAddress.country !== payload.country && !isNil(payload.country)) {
            existingAddress.country = payload.country;
            updated = true;
        }
        if (existingAddress.complement !== payload.complement && !isNil(payload.complement)) {
            existingAddress.complement = payload.complement;
            updated = true;
        }

        if (updated) {
            return await this.repository.save(existingAddress);
        }

        return existingAddress;
    }

    async getOrCreateAddress(payload: AddressPayload): Promise<Address> {
        if (payload.addressId) {
            return this.updateAddressIfNeeded(payload.addressId, payload);
        }
        return this.create(payload);
    }

}
