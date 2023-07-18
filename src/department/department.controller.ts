import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Controller('department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  createDepartment(@Body() body: CreateDepartmentDto, @Auth() auth: User) {
    return this.departmentService.create(body.name, body.managerId, auth);
  }

  @Get('/options')
  getCompanyDepartmentsOptions(@Auth() auth: User) {
    return this.departmentService.getCompanyDepartmentsOptions(auth.companyId);
  }

  @Get(':id')
  async findDepartmentById(@Param('id', ParseIntPipe) id: number) {
    const department = await this.departmentService.findOne(id);
    if (!department) {
      throw new NotFoundException(
        `couldn't find department with an id of ${id}`,
      );
    }
    return department;
  }

  @Get()
  findDepartmentsWithNameFilter(
    @Query('name') name: string,
    @Auth() auth: User,
  ) {
    return this.departmentService.findWithNameFilter(name, auth.companyId);
  }
}
