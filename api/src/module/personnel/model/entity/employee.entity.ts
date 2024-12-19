import {Address, BaseEntity} from "@common/model/entity";
import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {ulid} from 'ulid';
import {UserRoleEnum} from "@common/model";

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
    @Column({type:"enum", enum:UserRoleEnum, default:UserRoleEnum.Employee})
        role:UserRoleEnum;
    @OneToOne(() => Address, {cascade: true, eager: true})
    @JoinColumn({referencedColumnName: 'address_id', name: 'address_id_fk'})
    address: Address
}