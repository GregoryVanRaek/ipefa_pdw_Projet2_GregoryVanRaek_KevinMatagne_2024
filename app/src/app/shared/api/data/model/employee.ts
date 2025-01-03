import {Gender} from '@shared/api/data/enum/gender';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import {Address} from '@shared/api/data/model/address';
import {Contract} from '@shared/api/data/model/contract';

export interface Employee{
  Id:string;
  firstname:string;
  lastname:string;
  birthdate:Date;
  mail:string;
  phone:string;
  iban:string;
  gender:Gender;
  role:UserRoleEnum;
  address:Address;
  contract:Contract[];
}
