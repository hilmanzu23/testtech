import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { encodePassword } from 'src/core/util/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    await this.checkAvailableUser(email);
    const hash = await encodePassword(password);
    const users = await this.userModel.create(createUserDto);
    return this.userModel.findByIdAndUpdate(
      users.id,
      { password: hash },
      {
        new: true,
        runValidators: false,
      },
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userModel.findById(id);
    if (data.id === undefined) {
      throw new NotFoundException('User Not Found');
    }
    return data;
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

  async checkAvailableUser(email: string) {
    const userDb = await this.userModel.findOne({ email: email });
    if (userDb) throw new NotFoundException('Email Registered');
    return userDb;
  }
}
