import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ApiCodeResponse} from "@common/api";

export class AddressPayload {
    @ApiProperty()
    @Length(26,26)
    @IsOptional()
    addressId:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    road:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 8, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    nb:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 10, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    cp:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 50, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    town:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 50, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    country:string;

    @ApiProperty()
    @IsString({message: ApiCodeResponse.ADDRESS_PAYLOAD_IS_NOT_STRING})
    @Length(0, 255, {message: ApiCodeResponse.ADDRESS_PAYLOAD_LENGTH_ERROR})
    @IsOptional()
    complement:string;

}
