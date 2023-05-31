import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { ReturnLoginDto } from './dtos/return-login.dto';
import { LoginPayload } from './dtos/login-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateToken(token: string) {
    try {
      const payload: LoginPayload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const { email, password } = loginDto;
    const user: User | undefined = await this.userService
      .findUserByEmail(email)
      .catch(() => undefined);
    const isMatchPassowrd = await compare(password, user?.password || '');
    if (!user || !isMatchPassowrd) {
      throw new UnauthorizedException('Email or password invalid!');
    }
    const payload = new LoginPayload(user);
    const token = this.jwtService.sign({ ...payload });
    return {
      user: new ReturnUserDto(user),
      acessToken: token,
    };
  }
}
