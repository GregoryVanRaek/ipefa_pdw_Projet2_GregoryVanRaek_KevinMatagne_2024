import {Employee} from "../entity";
import {IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiCodeResponse} from "@common/api";

export class ContractUpdatePayload {
    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_ID_IS_MANDATORY})
    @Length(26,26)
    contractId:string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_HOURLYRATE_IS_MANDATORY})
    salary :number;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_LENGTH_ERROR})
    @IsOptional()
    perks:string;

    @ApiProperty()
    @IsDateString(undefined, {message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_NOT_VALID})
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_MANDATORY})
    startDate:Date;

    @ApiProperty()
    @IsDateString(undefined, {message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_NOT_VALID})
    @IsOptional()
    endDate:Date;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.CONTRACT_PAYLOAD_CONTRAT_TYPE_IS_NOT_STRING})
    contratType:string;

    @ApiProperty()
    @IsNumber(undefined, {message: ApiCodeResponse.CONTRACT_PAYLOAD_WEEKLYSCHEDULE_IS_NOT_NUMBER})
    weeklySchedule:number;

    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.CONTRACT_PAYLOAD_EMPLOYEE_IS_MANDATORY})
    employee:Employee;
}