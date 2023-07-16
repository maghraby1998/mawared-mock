import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  create(name: string, symbol: string) {
    return this.prisma.currency.create({
      data: {
        name,
        symbol,
      },
    });
  }

  findCurrenciesForCompany(currencyName: string) {
    return this.prisma.currency.findMany({
      where: { name: currencyName },
    });
  }
}
