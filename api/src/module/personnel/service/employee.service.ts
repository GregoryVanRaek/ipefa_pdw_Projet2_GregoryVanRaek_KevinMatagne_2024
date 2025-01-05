import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee, EmployeeCreatePayload, EmployeeUpdatePayload} from "../model";
import {Repository} from "typeorm";
import {Builder} from "builder-pattern";
import {ulid} from "ulid";
import {
    EmployeeCreateException,
    EmployeeDeleteException, EmployeeListException,
    EmployeeNotFoundException,
    EmployeeUpdateException
} from "../exception";
import {isNil} from "lodash";
import {Address, AddressService} from "@common/model";

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private readonly repository: Repository<Employee>
                , private readonly addressService :AddressService) {}

    async create(payload: EmployeeCreatePayload): Promise<Employee>{
        try {
            let address :Address;

            if (payload.address) {
                address = await this.addressService.getOrCreateAddress(payload.address);
            }

            return await this.repository.save(Builder<Employee>()
                .employeeId(`${ulid()}`)
                .firstname(payload.firstname)
                .lastname(payload.lastname)
                .birthdate(payload.birthdate)
                .mail(payload.mail)
                .phone(payload.phone)
                .iban(payload.iban)
                .gender(payload.gender)
                .role(payload.role)
                .address(address)
                .build()
            );
        } catch (e) {
            throw new EmployeeCreateException();
        }
    }

    async getAll(): Promise<Employee[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new EmployeeListException();
        }
    }

    async getOneById(id: string): Promise<Employee> {
        const result = await this.repository.findOneBy({ employeeId: id });
        if (!(isNil(result))) {
            return result;
        }
        throw new EmployeeNotFoundException();
    }

    async getOneByName(name:string): Promise<Employee> {
        const result = await this.repository.findOneBy({ lastname: name });
        if (!(isNil(result))) {
            return result;
        }
        throw new EmployeeNotFoundException();
    }

    async getOneByEmail(email:string): Promise<Employee> {
        const result = await this.repository.findOneBy({ mail: email });
        if (!(isNil(result))) {
            return result;
        }
        throw new EmployeeNotFoundException();
    }

    async delete(id: string): Promise<Employee> {
        try {
            const toDelete = await this.getOneById(id);
            return await this.repository.remove(toDelete);
        } catch (e) {
            throw new EmployeeDeleteException();
        }
    }

    async update(payload: EmployeeUpdatePayload): Promise<Employee> {
        try {
            let toUpdate = await this.getOneById(payload.employeeId);

            let address :Address;

            if (payload.address) {
                address = await this.addressService.getOrCreateAddress(payload.address);
                toUpdate.address = address;
            }

            toUpdate.firstname = payload.firstname;
            toUpdate.lastname = payload.lastname;
            toUpdate.birthdate = new Date(payload.birthdate);
            toUpdate.mail = payload.mail;
            toUpdate.phone = payload.phone;
            toUpdate.role = payload.role;
            toUpdate.iban = payload.iban;
            toUpdate.gender = payload.gender;

            return await this.repository.save(toUpdate);
        } catch (e) {
            throw new EmployeeUpdateException();
        }
    }

}
