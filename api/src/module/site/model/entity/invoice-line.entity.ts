import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceLine extends BaseEntity {
    @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
    invoiceLineId: string;

    @Column({ length: 255, nullable: false })
    itemName: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
    vatRate: number;

    
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
    
    @Column({ type: 'int', nullable: false }) 
    quantity: number;
    
    
    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceLines, { onDelete: 'CASCADE' })
    invoice: Invoice;
}
