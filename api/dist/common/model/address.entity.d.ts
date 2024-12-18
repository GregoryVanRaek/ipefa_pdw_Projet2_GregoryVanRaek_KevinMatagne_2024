import { BaseEntity } from './base.entity';
export declare class Address extends BaseEntity {
    address_id: string;
    road: string;
    nb: string;
    cp: string;
    town: string;
    country: string;
    complement: string;
}
