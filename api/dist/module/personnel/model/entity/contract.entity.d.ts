import { BaseEntity } from "@common/model";
import { Employee } from "./employee.entity";
export declare class Contract extends BaseEntity {
    contractId: string;
    salary: number;
    perks: string;
    startDate: Date;
    endDate: Date;
    contractType: string;
    weeklySchedule: number;
    employee: Employee;
}
