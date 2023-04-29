import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/api/login')
  login(@Body() payload: loginDto) {
    return this.service.login(payload);
  }

  @Post('/api/register')
  register(@Body() payload: registerDto) {
    return this.service.register(payload);
  }
}
