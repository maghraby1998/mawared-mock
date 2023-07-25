import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { CreateUserTypeDto } from './dtos/create-user-type.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body()
    body: CreateUserDto,
    @Auth() auth: User,
  ) {
    return this.authService.createUser(body, auth, file);
  }

  @Post('/signin')
  async signIn(@Body() body: SignInUserDto) {
    const response = await this.authService.signIn(body.email, body.password);
    delete response.user.password;
    return response;
  }

  @Post('/user-type')
  @UseGuards(AuthGuard)
  createUserType(@Body() body: CreateUserTypeDto) {
    return this.userService.createUserType(body.name);
  }

  @Get('/')
  findAllUsersWithFilters(@Query('name') name: string, @Auth() auth: User) {
    return this.userService.findAllWithFilters(name, auth);
  }

  @Get('/managers')
  getAllManagers(@Auth() auth: User) {
    return this.userService.getAllManagers(auth.companyId);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
