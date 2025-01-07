import { Employee } from "../entity";
export declare class ContractCreatePayload {
    salary: number;
    perks: string;
    startDate: Date;
    endDate: Date;
    contractType: string;
    weeklySchedule: number;
    employee: Employee;
}
