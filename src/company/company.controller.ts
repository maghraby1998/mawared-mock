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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { SuperGuard } from 'src/guards/super.guard';

@Controller('company')
@UseGuards(SuperGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @Get(':id')
  findOneCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Get()
  findAllCompanies(@Query('name') name: string) {
    return this.companyService.findAll(name);
  }
}
