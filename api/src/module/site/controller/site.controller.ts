import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import {SiteService} from '../service';
import {CreateSitePayload, Site, UpdateSitePayload} from '../model';

@ApiBearerAuth('access-token')
@ApiTags('Sites')
@Controller('site')
export class SiteController {
    constructor(private readonly service: SiteService) {
    }
    @Post('create/')
    create(@Body() payload: CreateSitePayload): Promise<Site> {
        return this.service.create(payload);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string):  Promise<Site> {
        console.log(id)
        return this.service.delete(id);
    }

  

    @Get('detail/:id')
    getById(@Param('id') id:string) : Promise<Site>{
        return this.service.getOneById(id);
    }

    @Put('update')
    update(@Body() payload: UpdateSitePayload):  Promise<Site> {
        return this.service.update(payload);
    }
   
    @Get('/list')
    getListByName():  Promise<Site[]> {
        return this.service.getAll();
    }
}
