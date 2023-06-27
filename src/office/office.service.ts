import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  create({ currencyId, ...officeInput }: CreateOfficeDto, auth: User) {
    return this.prisma.office.create({
      data: {
        ...officeInput,
        company: { connect: { id: auth.companyId } },
        curreny: { connect: { id: currencyId } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.office.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }
}
