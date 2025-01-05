import { Employee } from "../entity";
export declare class ContractUpdatePayload {
    contractId: string;
    hourlyRate: number;
    perks: string;
    startDate: Date;
    employee: Employee;
}
