import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { Auth } from 'src/decorators/auth.decorator';
import { Prisma, User } from '@prisma/client';
import { CreatePositionDto } from './dtos/create-position.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('position')
@UseGuards(AuthGuard)
export class PositionController {
  constructor(private positionService: PositionService) {}

  @Post()
  createPosition(@Body() body: CreatePositionDto, @Auth() auth: User) {
    return this.positionService.create(body.name, auth);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.findOne(id);
  }

  @Get()
  findPositionsWithNameFilter(@Query('name') name: string, @Auth() auth: User) {
    return this.positionService.findPositionsWithNameFilter(
      name,
      auth.companyId,
    );
  }
}
