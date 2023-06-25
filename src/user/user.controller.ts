import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { CreateUserTypeDto } from './dtos/create-user-type.dto';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body() body: SignInUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('/user-type')
  createUserType(@Body() body: CreateUserTypeDto) {
    return this.userService.createUserType(body.name);
  }
}
