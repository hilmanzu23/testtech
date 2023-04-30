import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/user/schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePassword } from 'src/util/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const cekUser = await this.checkAvailableUser(email);
    if (cekUser.length !== 0) {
      const hash = await comparePassword(password, cekUser[0].password);
      if (!hash) throw new NotFoundException('Wrong Email and Password');
      const resultValue = {
        id: cekUser[0].id,
        fullName: cekUser[0].fullName,
        email: cekUser[0].email,
        accessToken: 'asdasdasd',
        refreshToken: 'asdasdasdasd',
      };
      return resultValue;
    } else {
      throw new NotFoundException('Email Not Registered');
    }
  }

  async checkAvailableUser(email: string) {
    const userDb = await this.userModel.find({ email: email });
    return userDb;
  }
}
