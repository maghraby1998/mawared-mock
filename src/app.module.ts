import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfficeModule } from './office/office.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AuthMiddleWare } from './middlewares/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    OfficeModule,
    DepartmentModule,
    PositionModule,
    CompanyModule,
    UserModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes('*');
  }
}
