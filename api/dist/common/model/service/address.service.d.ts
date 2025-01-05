import { Repository } from "typeorm";
import { Address, AddressPayload } from "@common/model";
export declare class AddressService {
    private readonly repository;
    constructor(repository: Repository<Address>);
    create(payload: AddressPayload): Promise<Address>;
    getAll(): Promise<Address[]>;
    getOneById(id: string): Promise<Address>;
    delete(id: string): Promise<Address>;
    updateAddressIfNeeded(addressId: string, payload: AddressPayload): Promise<Address>;
    getOrCreateAddress(payload: AddressPayload): Promise<Address>;
}
