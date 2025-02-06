import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, Length, IsNotEmpty,IsInt} from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class UpdateInvoiceLinePayload {
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.INVOICE_LINE_ID_IS_MANDATORY })
    @Length(26,26)
    invoiceLineId: string;

    @ApiProperty()
    @IsInt({ message: ApiCodeResponse.INVOICE_LINE_QUANTITY_MUST_BE_INTEGER })
    @Min(1, { message: ApiCodeResponse.INVOICE_LINE_QUANTITY_MIN_ERROR })
    @Max(1000000, { message: ApiCodeResponse.INVOICE_LINE_QUANTITY_MAX_ERROR })
    quantity: number;

    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.INVOICE_LINE_ITEM_NAME_IS_MANDATORY })
    itemName: string;

    @ApiProperty()
    @IsNumber({}, { message: ApiCodeResponse.INVOICE_LINE_VAT_PERCENTAGE_MUST_BE_NUMBER })
    @Min(0, { message: ApiCodeResponse.INVOICE_LINE_VAT_PERCENTAGE_MIN_ERROR })
    @Max(100, { message: ApiCodeResponse.INVOICE_LINE_VAT_PERCENTAGE_MAX_ERROR })
    vatRate: number;

    @ApiProperty()
    @IsNumber({}, { message: ApiCodeResponse.INVOICE_LINE_PRICE_MUST_BE_DECIMAL })
    @Min(1, { message: ApiCodeResponse.INVOICE_LINE_PRICE_MIN_ERROR })
    @Max(1000000, { message: ApiCodeResponse.INVOICE_LINE_PRICE_MAX_ERROR })
    price: number;
}
