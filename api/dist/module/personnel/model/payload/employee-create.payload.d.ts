import { Address, UserRoleEnum } from "@common/model";
import { Contract } from "../entity";
import { Gender } from "../enum";
export declare class EmployeeCreatePayload {
    firstname: string;
    lastname: string;
    birthdate: Date;
    mail: string;
    phone: string;
    iban: string;
    gender: Gender;
    role: UserRoleEnum;
    address: Address;
    contracts: Contract[];
}
