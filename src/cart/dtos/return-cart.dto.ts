import { ReturnCartProductDto } from '../../cart-product/dtos/return-cartProduct.dto';
import { Cart } from '../entities/cart.entity';

export class ReturnCartDto {
  private id: number;
  private active: boolean;
  private cartProducts?: ReturnCartProductDto[];

  constructor(cart: Cart) {
    this.id = cart.id;
    this.active = cart.active;
    this.cartProducts = cart.cartProducts
      ? cart.cartProducts.map(
          (cartProduct) => new ReturnCartProductDto(cartProduct),
        )
      : undefined;
  }
}
