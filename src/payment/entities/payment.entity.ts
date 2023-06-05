import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { PaymentStatus } from '../../payment-status/entities/payment-status.entity';

@Entity({ name: 'payment' })
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export abstract class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  discount: number;

  @Column({ nullable: false })
  final_price: number;

  @Column({ nullable: false })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Relationship
  @OneToMany(() => Order, (order) => order.payment)
  orders?: Order;

  @ManyToOne(() => PaymentStatus, (status) => status.payments)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status?: PaymentStatus;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
  ) {
    this.statusId = statusId;
    this.price = price;
    this.discount = discount;
    this.final_price = finalPrice;
  }
}
