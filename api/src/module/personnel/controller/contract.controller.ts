import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {ContractService} from "../service";
import {Contract, ContractCreatePayload, ContractUpdatePayload} from "../model";

@ApiBearerAuth('access-token')
@ApiTags('Contracts')
@Controller('contract')
export class ContractController {
    constructor(private readonly service: ContractService) {}

    @Post('create')
    create(@Body() payload: ContractCreatePayload): Promise<Contract> {
        return this.service.create(payload);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<Contract> {
        return this.service.delete(id);
    }

    @Get('list')
    getAll(): Promise<Contract[]> {
        return this.service.getAll();
    }

    @Get('detail/:id')
    getById(@Param('id') id:string) :Promise<Contract>{
        return this.service.getOneById(id);
    }

    @Put('update')
    update(@Body() payload: ContractUpdatePayload): Promise<Contract> {
        return this.service.update(payload);
    }

}
