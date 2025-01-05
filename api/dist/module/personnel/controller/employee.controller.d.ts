import { EmployeeService } from "../service";
import { Employee, EmployeeCreatePayload, EmployeeUpdatePayload } from "../model";
export declare class EmployeeController {
    private readonly service;
    constructor(service: EmployeeService);
    create(payload: EmployeeCreatePayload): Promise<Employee>;
    delete(id: string): Promise<Employee>;
    getAll(): Promise<Employee[]>;
    getById(id: string): Promise<Employee>;
    getByEmail(email: string): Promise<Employee>;
    getByName(name: string): Promise<Employee>;
    update(payload: EmployeeUpdatePayload): Promise<Employee>;
}
