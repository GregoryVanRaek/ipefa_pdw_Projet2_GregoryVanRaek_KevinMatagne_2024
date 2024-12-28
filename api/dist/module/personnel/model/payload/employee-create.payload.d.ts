import { Address } from "@common/model";
import { Contract } from "../entity";
export declare class EmployeeCreatePayload {
    firstname: string;
    lastname: string;
    birthdate: Date;
    mail: string;
    phone: string;
    iban: string;
    address: Address;
    contracts: Contract[];
}
