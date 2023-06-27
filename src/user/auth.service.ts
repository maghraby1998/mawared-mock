import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTypeEnum } from 'src/enums/enums';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser({ managerId, ...userInput }: CreateUserDto, auth: User) {
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
      userType: { connect: { id: UserTypeEnum.EMPLOYEE } },
      ...(managerId && {
        manager: {
          connect: {
            id: managerId,
          },
        },
      }),
      ...(auth.companyId && {
        company: {
          connect: {
            id: auth.companyId ?? undefined,
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
