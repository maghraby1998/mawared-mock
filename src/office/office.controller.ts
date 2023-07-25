import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
    return this.officeService.createOrUpdate(body, auth);
  }

  @Get('/options')
  getCompanyOffices(@Auth() auth: User) {
    return this.officeService.getCompanyOffices(auth.companyId);
  }

  @Get(':id')
  findOneOffice(@Param('id', ParseIntPipe) id: number) {
    return this.officeService.findOne(id);
  }

  @Get()
  findManyOfficesWithNameFilter(
    @Query('name') name: string,
    @Auth() auth: User,
  ) {
    return this.officeService.findManyWithNameFilter(name, auth);
  }

  @Delete(':id')
  async deleteOffice(@Param('id', ParseIntPipe) id: number) {
    const office = await this.officeService.findOne(id);

    if (office.users.length) {
      throw new BadRequestException(
        `Can't delete (${office.name}) office, because it has (${office.users.length}) employees`,
      );
    }

    return this.officeService.delete(id);
  }
}
