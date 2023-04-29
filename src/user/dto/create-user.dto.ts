import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  salt: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  horoscope: string;

  @IsNotEmpty()
  zodiac: string;

  @IsNotEmpty()
  @Type(() => Number)
  height: number;

  @IsNotEmpty()
  @Type(() => Number)
  weight: number;

  imagePhoto: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
}
