import { Employee } from "../entity";
export declare class ContractUpdatePayload {
    contractId: string;
    salary: number;
    perks: string;
    startDate: Date;
    endDate: Date;
    contractType: string;
    weeklySchedule: number;
    employee: Employee;
}
