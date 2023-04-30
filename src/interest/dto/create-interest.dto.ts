import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateInterestDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'idUser' })
  idUser: string;
}
