import {Address} from '@shared/api/data/model/address';


export interface Site{
  siteId:string;
  siteName:string;
  comment:string;
  address:Address;
}
