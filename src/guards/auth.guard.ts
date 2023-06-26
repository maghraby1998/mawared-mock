import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException('type not bearer');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'randomsecretfornow',
      });

      console.log(payload);

      if (payload) {
        return true;
      } else {
        throw new UnauthorizedException('no payload');
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('catch');
    }
  }
}
