import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserTypeEnum } from 'src/enums/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(userInput: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: userInput });
  }

  update(userId: number, userUpdateInput: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: userUpdateInput,
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userType: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  createUserType(name: string) {
    return this.prisma.userType.create({
      data: {
        name,
      },
    });
  }

  findUsersByEmail(email: string) {
    return this.prisma.user.findMany({
      where: {
        email,
      },
      include: {
        userType: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAllWithFilters(name: string, auth: User) {
    return this.prisma.user.findMany({
      where: {
        name,
        companyId: auth.companyId,
        isBusinessPartner: false,
        id: { not: auth.id },
        userTypeId: {
          not: UserTypeEnum.SUPER,
        },
      },
      include: {
        office: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
        position: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  getAllManagers(companyId) {
    return this.prisma.user.findMany({
      where: {
        companyId,
        OR: [
          { isBusinessPartner: true },
          {
            managed: {
              some: {
                id: {
                  not: undefined,
                },
              },
            },
          },
        ],
      },
    });
  }
}
