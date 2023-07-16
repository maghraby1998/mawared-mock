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

  findByCompanyIdFilter(companyId: number) {
    if (companyId) {
      return this.prisma.department.findMany({
        where: {
          companyId,
        },
      });
    } else {
      return this.prisma.department.findMany();
    }
  }

  getCompanyDepartments(companyId: number) {
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
