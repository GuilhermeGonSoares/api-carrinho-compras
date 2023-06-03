import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentCreditCart extends Payment {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;
}
