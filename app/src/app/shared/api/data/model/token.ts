import { IsEmpty } from '@shared/core';

export interface Token extends IsEmpty{
  token: string;
  refreshToken: string;
}
