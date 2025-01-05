import { BaseEntity } from './base.entity';
export declare class Address extends BaseEntity {
    addressId: string;
    road: string;
    nb: string;
    cp: string;
    town: string;
    country: string;
    complement: string;
}
