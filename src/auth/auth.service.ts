/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/user/schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePassword } from 'src/core/util/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  @UseGuards()
  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const cekUserAvailable = await this.checkAvailableUser(email);
    await this.checkPasswordUser(password, cekUserAvailable.password);
    const payload = {id: cekUserAvailable.id,email: cekUserAvailable.email}
    const resultValue = {
      id: cekUserAvailable.id,
      fullName: cekUserAvailable.fullName,
      email: cekUserAvailable.email,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload),
    };
    return resultValue;
  }

  async checkAvailableUser(email: string) {
    const userDb = await this.userModel.findOne({ email: email });
    if (!userDb) throw new NotFoundException('Email Not Registered');
    return userDb;
  }
  async checkPasswordUser(password: string, passwordDb: string) {
    const cekPassword = await comparePassword(password, passwordDb);
    if (!cekPassword) throw new NotFoundException('Wrong Email and Password');
    return cekPassword;
  }
}
