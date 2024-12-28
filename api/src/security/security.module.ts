import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token, Credential } from './model';
import { TokenService } from './jwt';
import { SecurityService } from './service';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigKey, configManager } from '@common/config';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
    signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
  }), TypeOrmModule.forFeature([Credential, Token])],
  exports: [SecurityService], // comme si on rendait public le service
  providers: [SecurityService, TokenService],
  controllers: [SecurityController]
})

export class SecurityModule {
}
