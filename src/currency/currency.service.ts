import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  create(name: string, symbol: string, auth: User) {
    return this.prisma.currency.create({
      data: {
        name,
        symbol,
        company: {
          connect: {
            id: auth.companyId,
          },
        },
      },
    });
  }

  findCurrenciesForCompany(currencyName: string, companyId: number) {
    if (currencyName) {
      return this.prisma.currency.findMany({
        where: { id: companyId, name: currencyName },
      });
    } else {
      return this.prisma.currency.findMany({
        where: { id: companyId },
      });
    }
  }
}
