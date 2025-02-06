import {Address} from '@shared/api/data/model/address';

export interface Employee{
  employeeId:string;
  firstname:string;
  lastname:string;
  birthdate:string;
  mail:string;
  phone:string;
  iban:string;
  gender:any;
  role:any;
  address:Address;
}
