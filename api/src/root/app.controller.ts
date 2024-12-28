import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Route de base') // pour nommer la route dans swagger

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
