import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.User, Role.Admin)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('cart/:cartId')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Param('cartId') cartId: string,
    @UserDecorator() user: User,
  ) {
    return await this.orderService.createOrder(
      createOrderDto,
      +cartId,
      user.id,
    );
  }
}
