import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { Observable} from 'rxjs';
import {NoTokenFoundedException, TokenExpiredException} from '../security.exception';
import {Reflector} from '@nestjs/core';
import {isNil} from 'lodash';
import { IS_PUBLIC_KEY } from '@common/metadata';
import { SecurityService } from '../service';

@Injectable() // singleton au démarrage de l'application pour utiliser le guard ou on veut
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private readonly jwtService: JwtService,
              private readonly securityService: SecurityService,
              private reflector:Reflector) {}// lit la carte d'identité d'une méthode (métadonnées)

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//Here we check if route have @Public decorator;
    // si le décorateur public est mis, elle est publique, sinon elle est privée
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    return isPublic ? true : this.validateToken(context.switchToHttp().getRequest()); // si pas public on vérifie le token
  }

  private async validateToken(request: any): Promise<boolean> {
    if (!isNil(request.headers['authorization'])) { // le token existe dans le header ? clé:authorization value:token
      try {
        const id = this.jwtService.verify(request.headers['authorization'].replace('Bearer ', '')).sub; // si token pas crée il retourne le payload
        request.user =  await this.securityService.detail(id);
        return true;

        /*return from(this.securityService.detail(id)).pipe( // créer un observable
          map((user: Credential) => {
            request.user = user;
            return true;
          })
        );*/
      } catch (e) {
        this.logger.error(e.message);
        throw new TokenExpiredException()
      }
    }
    throw new NoTokenFoundedException();
  }
}