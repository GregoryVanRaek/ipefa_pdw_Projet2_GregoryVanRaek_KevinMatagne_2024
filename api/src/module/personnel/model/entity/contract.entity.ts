import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {BaseEntity} from "@common/model";
import {ulid} from "ulid";
import {Employee} from "./employee.entity";

@Entity()
export class Contract extends BaseEntity{
    @PrimaryColumn('varchar', {length: 26, default: () => `'${ulid()}'`})
    contractId:string;
    @Column({nullable:false, unique: false})
    salary :number;
    @Column({length:255,nullable:true,unique: false})
    perks:string;
    @Column({nullable:false})
    startDate:Date;
    @Column({nullable:true})
    endDate:Date;
    @Column({nullable:false})
    contractType:string;
    @Column({nullable:false})
    weeklySchedule:number;
    @OneToOne(() => Employee, {cascade: true, eager: true})
    @JoinColumn({referencedColumnName: 'employeeId', name: 'employee_id_fk'})
    employee: Employee;
}