import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, fullName } = createUserDto;
    const makeSalt = await bcrypt.genSalt();
    const user = new User();

    user.password = await bcrypt.hash(password, makeSalt);
    user.salt = makeSalt;
    user.email = email;
    user.fullName = fullName;

    const users = await this.userModel.create(user);
    return users;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userModel.findById(id);
    if (data.id === undefined) {
      throw new NotFoundException('data tidak di temukan');
    }
    return data.id;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
