import {ApiProperty} from '@nestjs/swagger';
import {IsOptional, IsString, Length} from 'class-validator';
import {Address} from '@common/model';


export class CreateSitePayload{
    
    @ApiProperty()
    @IsString()
    @Length(3)
    siteName: string;
    
    @ApiProperty()
    @IsOptional()
    comment:string;
    
    @ApiProperty()
    @IsOptional()
    address:Address
    
}