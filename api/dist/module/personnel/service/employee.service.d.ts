import { Employee, EmployeeCreatePayload, EmployeeUpdatePayload } from "../model";
import { Repository } from "typeorm";
import { AddressService } from "@common/model";
export declare class EmployeeService {
    private readonly repository;
    private readonly addressService;
    constructor(repository: Repository<Employee>, addressService: AddressService);
    create(payload: EmployeeCreatePayload): Promise<Employee>;
    getAll(): Promise<Employee[]>;
    getOneById(id: string): Promise<Employee>;
    getOneByName(name: string): Promise<Employee>;
    getOneByEmail(email: string): Promise<Employee>;
    delete(id: string): Promise<Employee>;
    update(payload: EmployeeUpdatePayload): Promise<Employee>;
}
