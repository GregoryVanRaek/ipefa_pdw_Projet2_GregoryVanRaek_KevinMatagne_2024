import { Employee, EmployeeCreatePayload, EmployeeUpdatePayload } from "../model";
import { Repository } from "typeorm";
export declare class PersonnelService {
    private readonly repository;
    constructor(repository: Repository<Employee>);
    create(payload: EmployeeCreatePayload): Promise<Employee>;
    getAll(): Promise<Employee[]>;
    getOneById(id: string): Promise<Employee>;
    getOneByName(name: string): Promise<Employee>;
    getOneByEmail(email: string): Promise<Employee>;
    delete(id: string): Promise<Employee>;
    update(payload: EmployeeUpdatePayload): Promise<Employee>;
}
