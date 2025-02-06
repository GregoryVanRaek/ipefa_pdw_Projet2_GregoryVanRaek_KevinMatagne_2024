import {InvoiceLine} from '@shared/api/data/model/invoiceLine';
import {Site} from '@shared/api';
import {Address} from '@shared/api/data/model/address';

export interface Invoice{
  invoiceId:string;
  invoiceType:any
  totalAmount:number;
  date:Date;
  address:Address;
  invoiceLines:InvoiceLine[];
  status:any
  type:any;
  site:Site;
}
