import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfficeModule } from './office/office.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [OfficeModule, DepartmentModule, PositionModule, CompanyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
