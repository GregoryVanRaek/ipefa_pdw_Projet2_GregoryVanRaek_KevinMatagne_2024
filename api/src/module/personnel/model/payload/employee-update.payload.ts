import {Address, UserRoleEnum} from "@common/model";
import {Contract} from "../entity";
import {IsDate, IsEmail, IsEnum, IsIBAN, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiCodeResponse} from "@common/api";
import {Gender} from "../enum";

export class EmployeeUpdatePayload {
    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_ID_IS_MANDATORY})
    @Length(26,26, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_ID_LENGTH_ERROR})
    employeeId:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_LENGTH_ERROR})
    @IsNotEmpty({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_FIRSTNAME_IS_MANDATORY})
    firstname:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_LENGTH_ERROR})
    @IsNotEmpty({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_LASTNAME_IS_MANDATORY})
    lastname:string;

    @ApiProperty()
    @IsDate({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_BIRTHDATE_IS_NOT_VALID})
    @IsOptional()
    birthdate:Date;

    @ApiProperty()
    @IsEmail(undefined, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_IS_NOT_VALID})
    @IsOptional()
    @Length(1, 50, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_MAIL_LENGTH_ERROR})
    mail: string;

    @ApiProperty()
    @IsOptional()
    @Length(1, 30, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_PHONE_LENGTH_ERROR})
    phone: string;

    @ApiProperty()
    @IsOptional()
    @Length(1, 34, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_IBAN_LENGTH_ERROR})
    @IsIBAN({message: ApiCodeResponse.EMPLOYEE_PAYLOAD_IBAN_IS_NOT_VALID})
    iban: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Gender, {message: ApiCodeResponse.EMPLOYEE_PAYLOAD_GENDER_NOT_VALID})
    gender: Gender;

    @ApiProperty()
    @IsOptional()
    address: Address

    @ApiProperty()
    @IsOptional()
    contracts: Contract[];
}