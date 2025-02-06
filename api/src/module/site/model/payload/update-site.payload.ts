import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {Address} from '@common/model';
import {ApiCodeResponse} from '@common/api';


export class UpdateSitePayload{

    @ApiProperty()
    @IsNotEmpty({message:ApiCodeResponse.SITE_PAYLOAD_ID_IS_MANDATORY})
    @Length(26,26, {message: ApiCodeResponse.SITE_PAYLOAD_ID_LENGTH_ERROR})
    siteId:string;
    
    
    @ApiProperty()
    @IsOptional()
    comment:string;
    
    @ApiProperty()
    @IsString()
    @Length(0,255,{ message:ApiCodeResponse.SITE_PAYLOAD_SITENAME_LENGTH_ERROR })
    siteName: string;

    @ApiProperty()
    @IsOptional()
    address:Address

}