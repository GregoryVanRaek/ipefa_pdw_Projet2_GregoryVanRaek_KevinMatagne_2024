import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {EmployeeService} from "../service";
import {Employee, EmployeeCreatePayload, EmployeeUpdatePayload} from "../model";

@ApiBearerAuth('access-token')
@ApiTags('Employees')
@Controller('employee')
export class EmployeeController {
    constructor(private readonly service :EmployeeService) {}

    @Post('create')
    create(@Body() payload: EmployeeCreatePayload): Promise<Employee> {
        return this.service.create(payload);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<Employee> {
        return this.service.delete(id);
    }

    @Get('list')
    getAll(): Promise<Employee[]> {
        return this.service.getAll();
    }

    @Get('detail/:id')
    getById(@Param('id') id:string) :Promise<Employee>{
        return this.service.getOneById(id);
    }

    @Get('email/:email')
    getByEmail(@Param('email') email: string): Promise<Employee> {
        return this.service.getOneByEmail(email);
    }

    @Get('name/:name')
    getByName(@Param('name') name: string): Promise<Employee> {
        return this.service.getOneByName(name);
    }

    @Put('update')
    update(@Body() payload: EmployeeUpdatePayload): Promise<Employee> {
        return this.service.update(payload);
    }


}
