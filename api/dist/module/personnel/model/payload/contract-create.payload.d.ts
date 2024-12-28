import { Employee } from "../entity";
export declare class ContractCreatePayload {
    hourlyRate: number;
    perks: string;
    startDate: Date;
    employee: Employee;
}
