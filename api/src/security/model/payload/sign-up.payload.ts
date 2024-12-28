import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class SignupPayload {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password: string

  @ApiProperty()
  mail: string
}