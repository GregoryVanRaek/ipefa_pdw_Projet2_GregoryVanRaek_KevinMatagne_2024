import {Employee} from '@shared/api/data/model/employee';

export interface Contract {
  id:string;
  salary:number;
  perks:string;
  startDate:Date;
  endDate:Date;
  contractType:string;
  weeklySchedule:number;
  employee:Employee;
}
