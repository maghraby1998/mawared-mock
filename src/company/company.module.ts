import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, UserService],
})
export class CompanyModule {}
