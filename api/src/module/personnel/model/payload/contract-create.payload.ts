import {Employee} from "../entity";
import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiCodeResponse} from "@common/api";

export class ContractCreatePayload {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_HOURLYRATE_IS_MANDATORY})
    hourlyRate :number;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_LENGTH_ERROR})
    @IsOptional()
    perks:string;

    @ApiProperty()
    @IsDate({message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_NOT_VALID})
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_MANDATORY})
    startDate:Date;

    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_EMPLOYEE_IS_MANDATORY})
    employee:Employee;
}