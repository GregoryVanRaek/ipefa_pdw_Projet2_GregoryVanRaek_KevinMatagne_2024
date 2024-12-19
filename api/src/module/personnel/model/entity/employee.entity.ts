import {BaseEntity} from "@common/model/entity";
import {Column, Entity, PrimaryColumn} from "typeorm";
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
}