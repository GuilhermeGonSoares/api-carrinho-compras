import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../order/dtos/create-order.dto';
import { PaymentCreditCart } from './entities/payment-credit-cart.entity';
import { Status } from '../enums/payment-status.enum';
import { PaymentPix } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly repositoty: Repository<Payment>,
  ) {}

  async createPayment(createOrderDto: CreateOrderDto) {
    if (createOrderDto.amountPayments) {
      const paymentCreditCart = new PaymentCreditCart(
        Status.Done,
        0,
        0,
        0,
        createOrderDto,
      );
      return this.repositoty.save(paymentCreditCart);
    } else if (createOrderDto.code && createOrderDto.datePayment) {
      const paymentPix = new PaymentPix(Status.Done, 0, 0, 0, createOrderDto);
      return this.repositoty.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount payments or code pix or date payment not found',
    );
  }
}
