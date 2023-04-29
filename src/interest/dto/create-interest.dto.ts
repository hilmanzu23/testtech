/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateInterestDto {
  @IsString()
  name: string;

  @IsString()
  createdAt: string;

  @MinLength(5, {
    message: 'maksimum 5 karakter',
  })
  password: string;
}
