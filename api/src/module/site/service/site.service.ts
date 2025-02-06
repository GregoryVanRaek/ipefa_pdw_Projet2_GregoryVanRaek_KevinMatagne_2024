import { Injectable } from '@nestjs/common';
import {CreateSitePayload, Site, UpdateSitePayload} from '../model';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {Builder} from 'builder-pattern';
import {ulid} from 'ulid';
import {
    SiteCreateException,
    SiteDeleteException,
    SiteListException,
    SiteNotFoundException,
    SiteUpdateException
} from '../exception';
import {isNil} from 'lodash';
import {AddressService} from '@common/model';


@Injectable()
export class SiteService {
    constructor(@InjectRepository(Site) private readonly repository:Repository<Site>,
                private readonly addressService :AddressService) {
    }
    
    async create(payload : CreateSitePayload):Promise<Site>{
        try {
            return await this.repository.save(Builder<Site>()
                .siteId(`${ulid()}`)
                .siteName(payload.siteName)
                .address(payload.address)
                .comment(payload.comment)
                .build()
            );
        }
        catch (error){
            throw new SiteCreateException()
        }
    }
    async getAll(): Promise<Site[]> {
        try {
            return await this.repository.find(); 
        }
        catch (e){
            throw new SiteListException()
        }
    }
    async getOneById(id: string): Promise<Site> {
        try {
            const result:Site = await this.repository.findOneBy({siteId:id})
            if (!(isNil(result)))
                return result
        }
        catch (e){
            throw new SiteNotFoundException()
        }
    }
    
    async delete(id:string):Promise<Site>{
        try {
            const toDelete:Site=await this.getOneById(id)
            if (!isNil(toDelete))
                return await this.repository.remove(toDelete);
        }catch (e){
            throw new SiteDeleteException()
        }
    }
    
    async update(payload:UpdateSitePayload):Promise<Site>{
        try {
            let toUpdate:Site=await this.getOneById(payload.siteId);
            
            if (payload.address)
                toUpdate.address=await this.addressService.getOrCreateAddress(payload.address);
            
            
            toUpdate.siteName = payload.siteName;
            toUpdate.comment=payload.comment;
            return await this.repository.save(toUpdate);
        }
        catch (e) {
            throw new SiteUpdateException()
        }
    }

    
   
}
