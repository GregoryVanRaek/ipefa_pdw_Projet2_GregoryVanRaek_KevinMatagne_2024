import { Injectable } from '@nestjs/common';
import { TokenService } from '../jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CredentialDeleteException,
  SignupException,
  UserAlreadyExistException,
  UserNotFoundException,
} from '../security.exception';
import { isNil } from 'lodash';
import { comparePassword, encryptPassword } from '../utils';
import {
  Credential,
  RefreshTokenPayload,
  SignInPayload,
  SignupPayload,
  Token,
} from '../model';
import { Builder } from 'builder-pattern';
import { GetUsernamePossibility } from '../model/enum';
import { ulid } from 'ulid';

@Injectable()
export class SecurityService { // assure la persistance et validation du crédential
  constructor(
    @InjectRepository(Credential)
    private readonly repository: Repository<Credential>,
    private readonly tokenService: TokenService,
  ) {}

  async detail(id: string): Promise<Credential> {
    const result = await this.repository.findOneBy({ credential_id: id });
    if (!isNil(result)) {
      return result;
    }
    throw new UserNotFoundException();
  }

  async signIn(payload: SignInPayload): Promise<Token | null> {
    const result: Credential | null = await this.getByUsername(
      payload.username,
      GetUsernamePossibility.SIGN_IN,
    );
    if (await comparePassword(payload.password, result.password))
    {
      return this.tokenService.getTokens(result);
    }
    throw new UserNotFoundException();
  }

  async signup(payload: SignupPayload): Promise<Credential | null> {
    const result: Credential | null = await this.getByUsername(
      payload.username,
      GetUsernamePossibility.SIGN_UP,
    );
    try {
      const encryptedPassword = await encryptPassword(payload.password);
      return this.repository.save(
        Builder<Credential>()
          .username(payload.username)
          .password(encryptedPassword)
          .mail(payload.mail)
          .credential_id(`${ulid()}`)
          .build(),
      );
    } catch (e) {
      throw new SignupException();
    }
  }

  async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
    return this.tokenService.refresh(payload);
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this.repository.remove(detail);
    } catch (e) {
      throw new CredentialDeleteException();
    }
  }

  private async getByUsername(
    username: string,
    possibility: GetUsernamePossibility,
  ): Promise<Credential> {
    const result: Credential | null = await this.repository.findOneBy({
      username,
    });
    switch (possibility) {
      case GetUsernamePossibility.SIGN_IN:
        if (isNil(result)) {
          throw new UserNotFoundException();
        }
        return result;
      case GetUsernamePossibility.SIGN_UP:
        if (!isNil(result)) {
          throw new UserAlreadyExistException();
        }
        return result;
    }
  }
}
