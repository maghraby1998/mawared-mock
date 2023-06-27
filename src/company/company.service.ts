import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(company: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: company,
    });
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  findAll(name: string) {
    return this.prisma.company.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
