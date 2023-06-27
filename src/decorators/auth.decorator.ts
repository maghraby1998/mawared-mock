import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.auth;
  },
);
