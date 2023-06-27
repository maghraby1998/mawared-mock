import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { CreateUserTypeDto } from './dtos/create-user-type.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  createUser(@Body() body: CreateUserDto, @Auth() auth: User) {
    return this.authService.createUser(body, auth);
  }

  @Post('/signin')
  signIn(@Body() body: SignInUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('/user-type')
  @UseGuards(AuthGuard)
  createUserType(@Body() body: CreateUserTypeDto) {
    return this.userService.createUserType(body.name);
  }

  @Get('/test')
  testMethod(@Auth() auth: User) {
    return auth;
  }
}
