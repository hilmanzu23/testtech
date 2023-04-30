import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
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

  @IsString()
  gender: string;

  @IsString()
  birthday: Date;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  imagePhoto: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
}
