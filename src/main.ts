import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        let validations: any = {};
        errors.forEach((el: any) => {
          validations[el.property] = Object.values(el.constraints);
        });

        return new HttpException(validations, HttpStatus.BAD_REQUEST);
      },
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
