import { ContractService } from "../service";
import { Contract, ContractCreatePayload, ContractUpdatePayload } from "../model";
export declare class ContractController {
    private readonly service;
    constructor(service: ContractService);
    create(payload: ContractCreatePayload): Promise<Contract>;
    delete(id: string): Promise<Contract>;
    getAll(): Promise<Contract[]>;
    getById(id: string): Promise<Contract>;
    update(payload: ContractUpdatePayload): Promise<Contract>;
}
