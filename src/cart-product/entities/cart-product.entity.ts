import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'cart_product' })
export class CartProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cart_id', nullable: false })
  cartId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Relationship
  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: Cart;

  @ManyToOne(() => Product, (product) => product.cartProducts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;
}
