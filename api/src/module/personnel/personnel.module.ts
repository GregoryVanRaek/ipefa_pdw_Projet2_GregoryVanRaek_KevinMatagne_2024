import { Module } from '@nestjs/common';
import {EmployeeController} from "./controller";
import {Contract, Employee} from "./model";
import {Address, AddressService} from "@common/model";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ContractService, EmployeeService} from './service';
import { ContractController } from './controller';

;

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Contract, Address])],
  controllers: [EmployeeController, ContractController],
  providers:[EmployeeService, ContractService, AddressService]
})
export class PersonnelModule {}
