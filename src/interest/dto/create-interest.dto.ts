import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateInterestDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  idUser: string;
}
