import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';

@Controller('api')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}
  @Post('interest')
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestService.create(createInterestDto);
  }

  @Get('interest/:id')
  findAllById(@Param('id') id: string) {
    return this.interestService.findAllById(id);
  }

  @Delete('interest/:id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(id);
  }
}
