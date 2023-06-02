import { ReturnProductDto } from '../../products/dtos/return-product.dto';
import { CartProduct } from '../entities/cart-product.entity';

export class ReturnCartProductDto {
  private amount: number;
  private product: ReturnProductDto;

  constructor(cartProduct: CartProduct) {
    this.amount = cartProduct.amount;
    this.product = new ReturnProductDto(cartProduct.product);
  }
}
