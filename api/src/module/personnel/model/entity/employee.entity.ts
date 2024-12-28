import {Address, BaseEntity} from "@common/model/entity";
import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {ulid} from 'ulid';
import {UserRoleEnum} from "@common/model";
import {Contract} from "./contract.entity";

@Entity()
export class Employee extends BaseEntity{
    @PrimaryColumn('varchar', {length: 26, default: () => `'${ulid()}'`})
        employeeId:string;
    @Column({length:255,nullable:false,unique: false})
        firstname:string;
    @Column({length:255,nullable:false,unique: false})
        lastname:string;
    @Column({nullable:true})
        birthdate:Date;
    @Column({length: 50, nullable: true, unique: true})
        mail: string;
    @Column({length: 30, nullable: true, unique: true})
        phone: string;
    @Column({length: 34, nullable: true})
        iban: string;
    @Column({type:"enum", enum:UserRoleEnum, default:UserRoleEnum.Employee})
        role:UserRoleEnum;
    @OneToOne(() => Address, {cascade: true, eager: true})
    @JoinColumn({referencedColumnName: 'addressId', name: 'address_id_fk'})
        address: Address
    @OneToMany(() => Contract, (c) => c.employee, {cascade: true, eager: true})
        employeeContracts: Contract[];
}