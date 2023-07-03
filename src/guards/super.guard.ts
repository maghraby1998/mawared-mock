import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SuperGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.auth.userType.name === 'super';
  }
}
