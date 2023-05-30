import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user: User | undefined = await this.userService
      .findUserByEmail(email)
      .catch(() => undefined);
    const isMatchPassowrd = await compare(password, user?.password || '');
    if (!user || !isMatchPassowrd) {
      throw new UnauthorizedException('Email or password invalid!');
    }
    return user;
  }
}
