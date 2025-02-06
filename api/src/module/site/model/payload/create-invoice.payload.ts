import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    ValidateNested,
    IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiCodeResponse } from '@common/api';
import {InvoiceStatus, InvoiceType} from '../enum';
import {CreateInvoiceLinePayload} from './create-invoice-line.payload';
import {Address} from '@common/model';

export class CreateInvoicePayload {
    
    @ApiProperty({ description: 'The type of the invoice (e.g., SALES, PURCHASE).' })
    @IsEnum(InvoiceType, { message: ApiCodeResponse.INVOICE_TYPE_IS_INVALID })
    @IsNotEmpty({ message: ApiCodeResponse.INVOICE_TYPE_IS_MANDATORY })
    type: InvoiceType;

    @ApiProperty({ description: 'The status of the invoice (e.g., PENDING, PAID, CANCELED).' })
    @IsEnum(InvoiceStatus, { message: ApiCodeResponse.INVOICE_STATUS_IS_INVALID })
    @IsNotEmpty({ message: ApiCodeResponse.INVOICE_STATUS_IS_MANDATORY })
    status: InvoiceStatus;

    @ApiProperty({ description: 'An array of invoice line items.' })
    @IsArray({ message: ApiCodeResponse.INVOICE_LINES_MUST_BE_ARRAY })
    @ValidateNested({ each: true })
    @Type(() => CreateInvoiceLinePayload)
    invoiceLines: CreateInvoiceLinePayload[];
    
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date:Date
    
    @ApiProperty()
    @IsNotEmpty()
    address:Address
}

