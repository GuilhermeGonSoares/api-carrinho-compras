import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: any): Promise<boolean> {
    try {
      const { authorization } = request.headers;
      const token = authorization ? authorization.split(' ')[1] : '';
      const payload = this.authService.validateToken(token);
      const user = await this.userService.findUserById(payload.id);

      request.user = user;
      request.payload = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'You must provide a valid token to access this route',
      );
    }
  }
}
