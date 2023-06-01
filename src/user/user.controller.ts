import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from './entities/user.entity';
import { UpdatedPasswordDto } from './dtos/updated-password.dtos';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.User, Role.Admin)
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

  @Patch()
  async updatedPassword(
    @UserDecorator() user: User,
    @Body() updatedPassword: UpdatedPasswordDto,
  ) {
    const updatedUser = await this.userService.updatedPassword(
      updatedPassword,
      user.id,
    );
    return new ReturnUserDto(updatedUser);
  }
}
