import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

enum UserType {
  SUPER = 1,
  OWNER = 2,
  EMPLOYEE = 3,
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser({ managerId, companyId, ...userInput }: CreateUserDto) {
    if (managerId) {
      const manager = await this.userService.fineOne(managerId);
      if (!manager) {
        throw new NotFoundException(
          `couldn't find manager with an id of ${managerId}`,
        );
      }
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
      ...(companyId && {
        company: {
          connect: {
            id: companyId,
          },
        },
      }),
    });
  }

  async signIn(email: string, password: string) {
    const users = await this.userService.findUsersByEmail(email);
    if (!users.length) {
      throw new NotFoundException(`couldn't find a user with the giving email`);
    }

    let user = users[0];

    let { password: storedPassword } = user;

    const isPasswordMatched = await bcrypt.compare(password, storedPassword);

    if (!isPasswordMatched) {
      throw new BadRequestException('incorrect passworod!');
    }

    const payload = { userId: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
