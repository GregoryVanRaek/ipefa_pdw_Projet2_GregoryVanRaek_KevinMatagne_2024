import { Module } from '@nestjs/common';
import {PersonnelController} from "./controller/personnel.controller";
import {Contract, Employee} from "./model/entity";
import {Address} from "@common/model";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PersonnelService } from './service';

;

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Contract, Address])],
  controllers: [PersonnelController],
  providers:[PersonnelService]
})
export class PersonnelModule {}
