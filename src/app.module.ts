import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/database';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    CityModule,
    StateModule,
    AddressModule,
    CacheModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
