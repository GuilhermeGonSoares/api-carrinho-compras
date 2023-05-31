import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @UserDecorator() user: User,
  ) {
    return this.addressService.create(createAddressDto, user.id);
  }
}
