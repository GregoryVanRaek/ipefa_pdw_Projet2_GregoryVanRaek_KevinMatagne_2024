import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import {CreateInvoicePayload, Invoice, InvoiceLine, Site, UpdateInvoicePayload} from '../model';
import {
    InvoiceCreateException,
    InvoiceDeleteException,
    InvoiceListException,
    InvoiceNotFoundException
} from '../exception';
import {TotalAmountForInvoice} from '../utils/totalAmount';
import {Address} from '@common/model';



@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice) private readonly repository: Repository<Invoice>,
        @InjectRepository(InvoiceLine) private readonly lineRepository: Repository<InvoiceLine>,
        @InjectRepository(Site)private readonly siteRepository: Repository<Site>,
        @InjectRepository(Address)private readonly addressRepository: Repository<Address>
    ) {}
    
    async create(siteId:string, payload: CreateInvoicePayload): Promise<Invoice> {
        try {
            const site=await this.siteRepository.findOneBy({siteId})
            console.log(payload.date)
            const invoice = Builder<Invoice>()
                .invoiceId(ulid())  
                .type(payload.type)
                .status(payload.status)
                .date(payload.date)
                .address({...payload.address,addressId:ulid()})
                .site(site)
                .build();
            
            if (payload.invoiceLines && payload.invoiceLines.length > 0) {
            const savedInvoice = await this.repository.save(invoice);
               
            const invoiceLines = payload.invoiceLines.map((line) =>
                    Builder<InvoiceLine>()
                        .invoiceLineId(ulid())  
                        .itemName(line.itemName)
                        .vatRate(line.vatRate)
                        .price(line.price)
                        .invoice(invoice)
                        .quantity(line.quantity)
                        .build()
                );
                await this.lineRepository.save(invoiceLines);
                return savedInvoice;
            }
        else
            throw new InvoiceCreateException();
        
        } catch (error) {
            console.log(error);
            throw new InvoiceCreateException();
        }
    }



   
    async getAllBySiteId(id:string): Promise<Invoice[]> {
        try {
            const invoices:Invoice[] = await this.repository.find({
                where: {
                    site: { siteId:id }, // Match the site.siteId
                },
                relations: ['invoiceLines'], // Include relations if needed
            });
            for (const invoice of invoices) {
                console.log(invoice.date)
                invoice.totalAmount=TotalAmountForInvoice(invoice);
            }
            return invoices
        } catch (error) {
            throw new InvoiceListException();
        }
    }

   
    async getOneById(id: string): Promise<Invoice> {
        console.log("ici")
        try {
            const result = await this.repository.findOne({
                where: {invoiceId:id},
                relations: ['invoiceLines'], // Include relations if needed
            });
            console.log('result', result);
            if (!isNil(result)) {
                return result;
            }
            throw new InvoiceNotFoundException();
        } catch (error) {
            throw new InvoiceNotFoundException();
        }
    }

   
    async delete(id: string): Promise<Invoice> {
        try {
            const toDelete = await this.getOneById(id);
            return await this.repository.remove(toDelete);
        } catch (error) {
            throw new InvoiceDeleteException();
        }
    }
    async update(payload: UpdateInvoicePayload): Promise<Invoice> {
        return await this.repository.manager.transaction(async manager => {
            const toUpdate = await this.getOneById(payload.invoiceId);

            Object.assign(toUpdate, {
                type: payload.type || toUpdate.type,
                status: payload.status || toUpdate.status,
                date: payload.date || toUpdate.date,
                address: payload.address || toUpdate.address
            });

            if (payload.invoiceLines?.length) {
                await manager.delete(InvoiceLine, { invoice: { invoiceId: payload.invoiceId } });

                const newLines = payload.invoiceLines.map(line => ({
                    ...line,
                    invoiceLineId: line.invoiceLineId || ulid(),
                    invoice: toUpdate
                }));

                toUpdate.invoiceLines = await manager.save(InvoiceLine, newLines);
            } else {
                toUpdate.invoiceLines = [];
                await manager.delete(InvoiceLine, { invoice: { invoiceId: payload.invoiceId } });
            }

            return await manager.save(Invoice, toUpdate);
        });
    }
}
