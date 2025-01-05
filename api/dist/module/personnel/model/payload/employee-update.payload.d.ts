import { AddressPayload, UserRoleEnum } from "@common/model";
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
    role: UserRoleEnum;
    address: AddressPayload;
    contracts: Contract[];
}
