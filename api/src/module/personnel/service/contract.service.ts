import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Contract, ContractCreatePayload, ContractUpdatePayload} from "../model";
import {Repository} from "typeorm";
import {Builder} from "builder-pattern";
import {ulid} from "ulid";
import {
    ContractCreateException,
    ContractDeleteException,
    ContractListException,
    ContractNotFoundException, ContractUpdateException
} from "../exception";
import {isNil} from "lodash";

@Injectable()
export class ContractService {
    constructor(@InjectRepository(Contract) private readonly repository: Repository<Contract>) {
    }

    async create(payload: ContractCreatePayload): Promise<Contract>{
        try {
            return await this.repository.save(Builder<Contract>()
                .contractId(`${ulid()}`)
                .hourlyRate(payload.hourlyRate)
                .perks(payload.perks)
                .startDate(payload.startDate)
                .employee(payload.employee)
                .build()
            )
        }
        catch (error) {
            throw new ContractCreateException();
        }
    }

    async getAll(): Promise<Contract[]>{
        try {
            return await this.repository.find();
        }
        catch (error) {
            throw new ContractListException();
        }
    }

    async getOneById(id :string): Promise<Contract>{
        try {
            const result: Contract = await this.repository.findOneBy({contractId :id});
            if(!(isNil(result))) {
                return result;
            }
        }
        catch (error) {
            throw new ContractNotFoundException()
        }
    }

    async delete(id: string): Promise<Contract>{
        try{
            const toDelete = await this.getOneById(id);
            if(!isNil(toDelete)){
                return await this.repository.remove(toDelete);
            }
        }catch (error) {
            throw new ContractDeleteException();
        }
    }

    async update(payload :ContractUpdatePayload) :Promise<Contract>{
        try {
            const toUpdate = await this.getOneById(payload.contractId);

            toUpdate.hourlyRate = payload.hourlyRate;
            toUpdate.perks = payload.perks;
            toUpdate.startDate = payload.startDate;

            return await this.repository.save(toUpdate);
        }
        catch (error) {
            throw new ContractUpdateException();
        }
    }

}
