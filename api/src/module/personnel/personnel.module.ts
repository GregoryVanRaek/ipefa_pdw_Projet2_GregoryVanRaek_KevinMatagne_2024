import { Module } from '@nestjs/common';
import {PersonnelController} from "./controller";
import {Contract, Employee} from "./model";
import {Address} from "@common/model";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PersonnelService } from './service';
import { ContractService } from './service/contract.service';

;

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Contract, Address])],
  controllers: [PersonnelController],
  providers:[PersonnelService, ContractService]
})
export class PersonnelModule {}
