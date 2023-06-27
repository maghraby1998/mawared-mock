import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: any, res: never, next: NextFunction) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    const payload = this.jwtService.decode(token) as { userId: number };

    if (payload) {
      let { userId } = payload;
      const user = await this.userService.fineOne(userId);
      req.auth = user;
      next();
      return;
    } else {
      next();
      return;
    }
  }
}
