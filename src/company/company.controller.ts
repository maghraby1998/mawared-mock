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
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(SuperGuard)
@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(@Body() body: CreateCompanyDto, @Auth() auth: User) {
    return this.companyService.create(body, auth);
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
