import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repositoty: Repository<Order>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    cartId: number,
    userId: number,
  ) {
    const payment: Payment = await this.paymentService.createPayment(
      createOrderDto,
    );

    const order = await this.repositoty.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.findCartByUserId(userId, true);

    cart.cartProducts?.forEach((cartProduct) => {
      this.orderProductService.createOrderProduct(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });

    return null;
  }
}
