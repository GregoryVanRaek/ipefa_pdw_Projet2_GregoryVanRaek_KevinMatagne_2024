import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Site} from './model';
import {Address, AddressService} from '@common/model';
import {SiteController} from './controller';
import {SiteService} from './service';
import {Invoice} from './model';
import {InvoiceLine} from './model';
import {InvoiceController} from './controller/invoice.controller';
import {InvoiceService} from './service/invoice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Site,Address,Invoice,InvoiceLine])],
    controllers: [SiteController,InvoiceController],
    providers:[SiteService,AddressService,InvoiceService],
})
export class SiteModule {}
