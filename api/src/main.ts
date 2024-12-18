import {NestFactory} from '@nestjs/core';
import {ConfigKey, configManager} from '@common/config';
import {swaggerConfiguration} from '@common/documentation';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@root/app.module';
import { HttpExceptionFilter, ValidationException } from '@common/exception';
import { ApiInterceptor } from '@common/api';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ // accepter les requêtes depuis une autre url
    origin:'http://localhost:4200',
    methods:'GET,PUT,PATCH,POST,DELETE'
  });

  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));

  app.useGlobalInterceptors(new ApiInterceptor()); // utiliser l'interceptor pour renvoyer les données sous un bon format api response

  app.useGlobalPipes(new ValidationPipe({ // validation des payload
    exceptionFactory: (validationErrors: ValidationError[] = []) => new ValidationException(validationErrors)
  }));

  swaggerConfiguration.config(app);

  app.useGlobalFilters(new HttpExceptionFilter()); // utilise le filtre des exceptions
  await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT), 10));

}

bootstrap().then(()=>{
  const logger = new Logger('Main Logger');
  logger.log('Server is started !!')
});
