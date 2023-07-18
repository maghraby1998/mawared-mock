import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  create(name: string, managerId: number, auth: User) {
    return this.prisma.department.create({
      data: {
        name,
        company: {
          connect: {
            id: auth.companyId,
          },
        },
        ...(managerId && {
          manager: {
            connect: {
              id: managerId,
            },
          },
        }),
      },
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  findWithNameFilter(name: string, companyId: number) {
    return this.prisma.department.findMany({
      where: {
        name: {
          contains: name,
        },
        companyId,
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  getCompanyDepartmentsOptions(companyId: number) {
    return this.prisma.department.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
