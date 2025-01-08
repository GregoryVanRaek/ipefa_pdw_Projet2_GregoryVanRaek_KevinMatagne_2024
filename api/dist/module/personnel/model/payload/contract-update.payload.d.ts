import { Employee } from "../entity";
export declare class ContractUpdatePayload {
    contractId: string;
    salary: number;
    perks: string;
    endDate: Date;
    weeklySchedule: number;
    employee: Employee;
}
