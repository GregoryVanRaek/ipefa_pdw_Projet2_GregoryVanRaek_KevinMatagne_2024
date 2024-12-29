import { AddressPayload } from "@common/model";
import { Contract } from "../entity";
import { Gender } from "../enum";
export declare class EmployeeUpdatePayload {
    employeeId: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    mail: string;
    phone: string;
    iban: string;
    gender: Gender;
    address: AddressPayload;
    contracts: Contract[];
}
