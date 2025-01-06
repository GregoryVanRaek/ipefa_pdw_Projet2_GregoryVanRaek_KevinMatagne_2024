import { Employee } from "../entity";
export declare class ContractCreatePayload {
    salary: number;
    perks: string;
    startDate: Date;
    endDate: Date;
    contratType: string;
    weeklySchedule: number;
    employee: Employee;
}
