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
    @IsOptional()
    hourlyRate :number;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.CONTRACT_PAYLOAD_PERKS_LENGTH_ERROR})
    @IsOptional()
    perks:string;

    @ApiProperty()
    @IsDateString(undefined, {message: ApiCodeResponse.CONTRACT_PAYLOAD_STARTDATE_IS_NOT_VALID})
    @IsOptional()
    startDate:Date;

    @ApiProperty()
    @IsOptional()
    employee:Employee;
}