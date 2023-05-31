import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) {
      throw new ForbiddenException(
        'You need use AuthGuard to access request.user',
      );
    }

    return user;
  },
);
