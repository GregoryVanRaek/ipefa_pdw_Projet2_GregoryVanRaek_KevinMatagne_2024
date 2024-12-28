import { Address } from "@common/model";
import { Contract } from "../entity";
export declare class EmployeeUpdatePayloads {
    employeeId: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    mail: string;
    phone: string;
    iban: string;
    address: Address;
    contracts: Contract[];
}
