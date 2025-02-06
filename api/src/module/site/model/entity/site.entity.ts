import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import {Address, BaseEntity} from '@common/model';
import {ulid} from 'ulid';

import {Invoice} from './invoice.entity';


@Entity()
export class Site extends BaseEntity{
    @PrimaryColumn('varchar', {length: 26, default: () => `'${ulid()}'`})
    siteId:string;
    @Column({length:255,nullable:false,unique: true})
    siteName:string;
    
    @Column({nullable:true})
    comment:string;
    
    @OneToOne(() => Address, {cascade: true, eager: true})
    @JoinColumn({referencedColumnName: 'addressId', name: 'address_id_fk'})
    address: Address
    @OneToMany(() => Invoice, (invoice) => invoice.site, { cascade: true,eager:true })
    invoices: Invoice[];
}