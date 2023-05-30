import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.list()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    const newUser = await this.userService.create(user);
    return new ReturnUserDto(newUser);
  }
}
