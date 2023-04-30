import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Interest } from './schemas/interest.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest.name)
    private interestModel: mongoose.Model<Interest>,
  ) {}

  async create(createInterestDto: CreateInterestDto) {
    const { name, idUser } = createInterestDto;
    const Interest = await this.interestModel.create({
      name: name,
      idUser: idUser,
    });
    return Interest;
  }

  async findAllById(idUser: string) {
    const users = await this.interestModel.find({ idUser: idUser });
    return users;
  }

  async remove(id: string): Promise<Interest> {
    return await this.interestModel.findByIdAndDelete(id);
  }
}
