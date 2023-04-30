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
import { AuthGuard } from '../core/util/auth.guard';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Interest')
@Controller('api')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @ApiCreatedResponse({ description: 'create interest byid user' })
  @Post('interest')
  @UseGuards(AuthGuard)
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestService.create(createInterestDto);
  }

  @ApiCreatedResponse({ description: 'get interest byid user' })
  @Get('interest/:id')
  @UseGuards(AuthGuard)
  findAllById(@Param('id') id: string) {
    return this.interestService.findAllById(id);
  }

  @ApiCreatedResponse({ description: 'delete interest byid user' })
  @Delete('deleteInterest/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.interestService.remove(id);
  }
}
