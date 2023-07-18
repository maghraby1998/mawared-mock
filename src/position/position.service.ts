import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
Prisma;

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}
  create(name: string, auth: User) {
    return this.prisma.position.create({
      data: {
        name,
        company: {
          connect: {
            id: auth.companyId,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.position.findUnique({ where: { id } });
  }

  findPositionsWithNameFilter(name: string, companyId: number) {
    return this.prisma.position.findMany({
      where: {
        name: {
          contains: name,
        },
        companyId,
      },
    });
  }
}
