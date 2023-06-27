import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { UserTypeEnum } from 'src/enums/enums';

@Injectable()
export class SuperGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    const payload = this.jwtService.decode(token) as { userId: number };

    if (payload) {
      const user = await this.userService.fineOne(payload.userId);
      if (user.userTypeId === UserTypeEnum.SUPER) {
        return true;
      } else {
        throw new UnauthorizedException(
          'this action is only authorized by super user type',
        );
      }
    }
  }
}
