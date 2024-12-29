import { Address, BaseEntity } from "@common/model/entity";
import { UserRoleEnum } from "@common/model";
import { Contract } from "./contract.entity";
import { Gender } from "../enum";
export declare class Employee extends BaseEntity {
    employeeId: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    mail: string;
    phone: string;
    iban: string;
    gender: Gender;
    role: UserRoleEnum;
    address: Address;
    employeeContracts: Contract[];
}
