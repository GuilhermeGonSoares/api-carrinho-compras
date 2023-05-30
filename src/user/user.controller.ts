import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  @Get(':id')
  async getUserWithRelations(@Param('id') id: string) {
    const user = await this.userService.findUserWithRelations(+id);
    return new ReturnUserDto(user);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    const newUser = await this.userService.create(user);
    return new ReturnUserDto(newUser);
  }
}
