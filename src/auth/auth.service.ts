import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private data: any[] = [];
  constructor(private jwtService: JwtService) {}

  async register(createDto: registerDto) {
    const { fullName, email, password } = createDto;
    const userSalt = await bcrypt.genSalt();
    return this.data.push({
      id: uuidv4(),
      email: email,
      fullName: fullName,
      salt: userSalt,
      gender: '',
      birthday: '',
      horoscope: '',
      zodiac: '',
      height: 0,
      weight: 0,
      imagePhoto:
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      password: await bcrypt.hash(password, userSalt),
    });
  }

  async login(createDto: loginDto) {
    const { email, password } = createDto;
    const itemsData = this.findByEmail(email);
    const payload = {
      sub: itemsData.id,
      email: itemsData.email,
    };
    const viewData = {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: '',
      fullName: itemsData.fullName,
      id: itemsData.id,
      email: itemsData.email,
      gender: itemsData.gender,
      birthday: itemsData.birthday,
      horoscope: itemsData.horoscope,
      zodiac: itemsData.zodiac,
      height: itemsData.height,
      weight: itemsData.weight,
      imagePhoto: itemsData.imagePhoto,
    };
    const checkPassword = await bcrypt.compare(password, itemsData.password);
    if (checkPassword) {
      return viewData;
    } else {
      throw new NotFoundException('Password Anda Salah');
    }
  }

  findByEmail(email: string) {
    const data = this.data.find((items) => items.email === email);
    if (data === undefined) {
      throw new NotFoundException('Data tidak di temukan');
    }
    return data;
  }
}
