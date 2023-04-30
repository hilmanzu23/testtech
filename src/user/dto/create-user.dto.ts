import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'password must 6 character' })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'if null please input ""' })
  gender: string;

  @IsString()
  @ApiProperty({ type: String, description: 'if null please input ""' })
  birthday: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'if null please input ""' })
  horoscope: string;

  @IsString()
  @ApiProperty({ type: String, description: 'if null please input ""' })
  zodiac: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'if null please input ""' })
  height: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'if null please input ""' })
  weight: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'Please input default image => https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  })
  imagePhoto: string;
}
