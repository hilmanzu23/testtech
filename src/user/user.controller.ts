import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '../core/util/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InterestService } from 'src/interest/interest.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly interestService: InterestService,
  ) {}

  // @Post('user')
  // async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }

  @ApiCreatedResponse({ description: 'get all user' })
  @Get('user')
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiCreatedResponse({ description: 'get profile user' })
  @Get('getProfile/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    const interest = await this.interestService.findAllById(id);
    return this.userService.findOne(id, interest);
  }

  @ApiCreatedResponse({ description: 'update profile user' })
  @ApiBody({ type: UpdateUserDto })
  @Put('updateProfile/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiCreatedResponse({ description: 'delete profile user' })
  @Delete('deleteProfile/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
