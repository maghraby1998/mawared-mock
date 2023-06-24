import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OfficeService {
  constructor(private prisma: PrismaService) {}

  create(office: Prisma.OfficeCreateInput) {
    return this.prisma.office.create({
      data: office,
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
