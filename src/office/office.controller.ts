import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dtos/create-office.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('office')
export class OfficeController {
  constructor(private officeService: OfficeService) {}

  @Post()
  createOffice(@Body() body: CreateOfficeDto, @Auth() auth: User) {
    return this.officeService.create(body, auth);
  }

  @Get(':id')
  findOneOffice(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }
}
