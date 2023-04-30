import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { AuthGuard } from 'src/core/util/auth.guard';

@Controller('api')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @UseGuards(AuthGuard)
  @Post('interest')
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestService.create(createInterestDto);
  }

  @UseGuards(AuthGuard)
  @Get('interest/:id')
  findAllById(@Param('id') id: string) {
    return this.interestService.findAllById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('interest/:id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(id);
  }
}
