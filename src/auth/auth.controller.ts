import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnUserDto> {
    const user = await this.authService.login(loginDto);
    return new ReturnUserDto(user);
  }
}
