import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

enum UserType {
  SUPER = 1,
  OWNER = 2,
  EMPLOYEE = 3,
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp({ managerId, ...userInput }: CreateUserDto) {
    const manager = await this.userService.fineOne(managerId);
    if (!manager) {
      throw new NotFoundException(
        `couldn't find manager with an id of ${managerId}`,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userInput.password, saltOrRounds);

    userInput.password = hash;

    return this.userService.create({
      ...userInput,
      userType: { connect: { id: UserType.EMPLOYEE } },
      ...(managerId && {
        manager: {
          connect: {
            id: managerId,
          },
        },
      }),
    });
  }

  signIn(email: string, password: string) {
    return { email, password };
  }
}
