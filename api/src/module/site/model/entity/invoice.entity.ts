import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import {Address, BaseEntity} from '@common/model';

import {InvoiceType,InvoiceStatus} from '../enum';
import {InvoiceLine} from './invoice-line.entity';
import {Site} from './site.entity';

@Entity()
export class Invoice extends BaseEntity {
    @PrimaryColumn('varchar', { length: 26 })
    invoiceId: string;

    @Column({ type: 'enum', enum: InvoiceType, nullable: false })
    type: InvoiceType;

    @Column({ type: 'enum', enum: InvoiceStatus, nullable: false })
    status: InvoiceStatus;

    @OneToMany(() => InvoiceLine, (invoiceLine) => invoiceLine.invoice, { cascade: true })
    invoiceLines: InvoiceLine[];
    
    @ManyToOne(()=>Site,(site)=>site.invoices,)
    site:Site;
    
    @OneToOne(() => Address, {cascade: true, eager: true})
    @JoinColumn({referencedColumnName: 'addressId', name: 'address_id_fk'})
    address: Address
    
    totalAmount: number;

    @Column({ type: 'timestamp'})
    date: Date;
}