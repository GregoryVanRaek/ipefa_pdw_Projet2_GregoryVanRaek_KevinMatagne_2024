import { BaseEntity } from "@common/model";
import { Employee } from "./employee.entity";
export declare class Contract extends BaseEntity {
    contractId: string;
    hourlyRate: number;
    perks: string;
    startDate: Date;
    employee: Employee;
}
