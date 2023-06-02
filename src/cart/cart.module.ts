import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    AuthModule,
    UserModule,
    CartProductModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}