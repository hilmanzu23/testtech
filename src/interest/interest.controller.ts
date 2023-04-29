import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';

@Controller('interest')
export class InterestController {
  constructor(private interestService: InterestService) {}

  @Get('')
  get(@Query('name') name: string, @Query('createdAt') createdAt: string) {
    return this.interestService.get(name, createdAt);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.interestService.getById(id);
  }

  @Post('')
  created(@Body() payload: CreateInterestDto) {
    return this.interestService.created(payload);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('createdAt') createdAt: string,
  ) {
    return this.interestService.update(id, name, createdAt);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.interestService.delete(id);
  }
}
