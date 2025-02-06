import { ApiCodeResponse } from "@common/api";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    Length,
    ValidateNested
} from 'class-validator';
import {InvoiceStatus, InvoiceType} from "../enum";
import {UpdateInvoiceLinePayload} from './update-invoice-line-payload';
import {Address} from '@common/model';



export class UpdateInvoicePayload {

    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.INVOICE_ID_IS_MANDATORY })
    @Length(26,26)
    invoiceId:string;
    
    @ApiProperty({ description: 'The type of the invoice (SALES, PURCHASE).' })
    @IsEnum(InvoiceType, { message: ApiCodeResponse.INVOICE_TYPE_IS_INVALID })
    @IsOptional()
    type: InvoiceType;

    @ApiProperty({ description: 'The status of the invoice (PENDING, PAID, CANCELED).' })
    @IsEnum(InvoiceStatus, { message: ApiCodeResponse.INVOICE_STATUS_IS_INVALID })
    @IsOptional()
    status: InvoiceStatus;
    
    @ApiProperty({
        type: [UpdateInvoiceLinePayload],
        required: true,
    })
    @ValidateNested({ each: true })
    invoiceLines: UpdateInvoiceLinePayload[];

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date:Date

    @ApiProperty()
    @IsNotEmpty()
    address:Address
}

