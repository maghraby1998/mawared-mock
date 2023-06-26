import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { CreateUserTypeDto } from './dtos/create-user-type.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
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
}
