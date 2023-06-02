import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { InsertCartDto } from '../cart/dtos/insert-cart-dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly repository: Repository<CartProduct>,
    private readonly productService: ProductsService,
  ) {}

  async verifyCartProductExist(
    productId: number,
    cartId: number,
  ): Promise<CartProduct> {
    const cartProduct = await this.repository.findOne({
      where: { cartId, productId },
    });

    if (!cartProduct) {
      throw new NotFoundException('cart_product not found');
    }

    return cartProduct;
  }

  async createCartProduct(
    insertCart: InsertCartDto,
    cartId: number,
  ): Promise<CartProduct> {
    return await this.repository.save({ ...insertCart, cartId });
  }

  async insertProductInCart(insertCart: InsertCartDto, cartId: number) {
    await this.productService.findProductById(insertCart.productId);
    const cartProduct: CartProduct | undefined =
      await this.verifyCartProductExist(insertCart.productId, cartId).catch(
        () => undefined,
      );

    if (!cartProduct) {
      return await this.createCartProduct(insertCart, cartId);
    }

    return await this.repository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCart.amount,
    });
  }
}
