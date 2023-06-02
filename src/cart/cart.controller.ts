import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserModule } from '../user/user.module';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { CartService } from './cart.service';
import { InsertCartDto } from './dtos/insert-cart-dto';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(AuthGuard, UserModule)
@Roles(Role.User)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Body() insertCart: InsertCartDto,
    @UserDecorator() user: User,
  ) {
    return this.cartService.insertProductcart(insertCart, user.id);
  }
}
