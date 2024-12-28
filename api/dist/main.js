"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("./common/config");
const documentation_1 = require("./common/documentation");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./root/app.module");
const exception_1 = require("./common/exception");
const api_1 = require("./common/api");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,PUT,PATCH,POST,DELETE'
    });
    app.setGlobalPrefix(config_1.configManager.getValue(config_1.ConfigKey.APP_BASE_URL));
    app.useGlobalInterceptors(new api_1.ApiInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => new exception_1.ValidationException(validationErrors)
    }));
    documentation_1.swaggerConfiguration.config(app);
    app.useGlobalFilters(new exception_1.HttpExceptionFilter());
    await app.listen(parseInt(config_1.configManager.getValue(config_1.ConfigKey.APP_PORT), 10));
};
bootstrap().then(() => {
    const logger = new common_1.Logger('Main Logger');
    logger.log('Server is started !!');
});
//# sourceMappingURL=main.js.map