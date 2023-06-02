import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct]), ProductsModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
