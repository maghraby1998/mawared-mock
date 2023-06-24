import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Controller('office')
export class OfficeController {
  constructor(private officeService: OfficeService) {}

  @Post()
  createOffice(@Body() { companyId, ...body }: CreateOfficeDto) {
    return this.officeService.create({
      ...body,
      company: {
        connect: { id: companyId },
      },
    });
  }

  @Get(':id')
  findOneOffice(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }
}
