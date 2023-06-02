import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserModule } from '../user/user.module';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { CartService } from './cart.service';
import { InsertCartDto } from './dtos/insert-cart-dto';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { ReturnCartDto } from './dtos/return-cart.dto';

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
    return new ReturnCartDto(
      await this.cartService.insertProductcart(insertCart, user.id),
    );
  }

  @Get()
  async findOne(@UserDecorator() user: User): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(user.id, true),
    );
  }

  @Delete()
  async clearCart(@UserDecorator() user: User) {
    return this.cartService.clearCart(user.id);
  }

  @Delete('product/:productId')
  async deleteProductInCart(
    @UserDecorator() user: User,
    @Param('productId') productId: string,
  ) {
    return await this.cartService.deleteProductCart(+productId, user.id);
  }
}
