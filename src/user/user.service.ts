import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
}
