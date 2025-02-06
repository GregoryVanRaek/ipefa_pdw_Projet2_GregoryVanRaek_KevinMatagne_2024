import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateInvoicePayload} from '../model';
import {Invoice} from '../model';
import {InvoiceService} from '../service/invoice.service';
import {UpdateInvoicePayload} from '../model';


@ApiBearerAuth('access-token')
@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly service: InvoiceService) {
    }
    @Post('create/:siteId')
    create(@Param('siteId') siteId:string,@Body() payload: CreateInvoicePayload): Promise<Invoice> {
        return this.service.create(siteId,payload);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string):  Promise<Invoice> {
        return this.service.delete(id);
    }

    @Get('/list/:siteId')
    getBySiteId(@Param('siteId') siteId:string):Promise<Invoice[]> {
        return this.service.getAllBySiteId(siteId);
    }

    @Get('detail/:id')
    getById(@Param('id') id:string) : Promise<Invoice>{
        return this.service.getOneById(id);
    }


  @Put('update')
    update(@Body() payload:UpdateInvoicePayload ):  Promise<Invoice> {
        console.log("update",payload)
        return this.service.update(payload);
    }
    

}
