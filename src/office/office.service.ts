import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  createOrUpdate(
    { currencyId, id, ...officeInput }: CreateOfficeDto,
    auth: User,
  ) {
    let officeInputData = {
      ...officeInput,
      company: { connect: { id: auth.companyId } },
      currency: { connect: { id: currencyId } },
    };

    if (id) {
      return this.prisma.office.update({
        where: { id: +id },
        data: officeInputData,
      });
    } else {
      return this.prisma.office.create({
        data: officeInputData,
      });
    }
  }

  findOne(id: number) {
    return this.prisma.office.findUnique({
      where: { id },
      include: {
        company: true,
        users: {
          select: {
            _count: true,
          },
        },
      },
    });
  }

  findManyWithNameFilter(name: string, auth: User) {
    return this.prisma.office.findMany({
      where: {
        name: {
          contains: name,
        },
        companyId: auth.companyId,
      },
      include: {
        currency: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  getCompanyOffices(companyId: number) {
    return this.prisma.office.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.office.delete({
      where: { id },
    });
  }
}
