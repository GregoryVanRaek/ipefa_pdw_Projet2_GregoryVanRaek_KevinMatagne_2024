import { Contract, ContractCreatePayload, ContractUpdatePayload } from "../model";
import { Repository } from "typeorm";
export declare class ContractService {
    private readonly repository;
    constructor(repository: Repository<Contract>);
    create(payload: ContractCreatePayload): Promise<Contract>;
    getAll(): Promise<Contract[]>;
    getOneById(id: string): Promise<Contract>;
    delete(id: string): Promise<Contract>;
    update(payload: ContractUpdatePayload): Promise<Contract>;
}
