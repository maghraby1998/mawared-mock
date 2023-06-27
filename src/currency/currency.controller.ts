import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  createCurrency(@Body() body: CreateCurrencyDto, @Auth() auth: User) {
    return this.currencyService.create(body.name, body.symbol, auth);
  }

  @Get()
  findAllCurrenciesForCompany(@Query('name') name: string, @Auth() auth: User) {
    return this.currencyService.findCurrenciesForCompany(name, auth.companyId);
  }
}
