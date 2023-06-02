import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDto } from './dtos/insert-cart-dto';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repository: Repository<Cart>) {}

  async verifyActiveCart(userId: number): Promise<Cart> {
    const cart = await this.repository.findOne({
      where: {
        userId,
        active: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart active not found');
    }

    return cart;
  }

  async createCart(userId: number): Promise<Cart> {
    return await this.repository.save({
      active: true,
      userId,
    });
  }

  async insertProductcart(insertCart: InsertCartDto, userId: number) {
    const cart = await this.verifyActiveCart(userId).catch(() =>
      this.createCart(userId),
    );

    return cart;
  }
}
