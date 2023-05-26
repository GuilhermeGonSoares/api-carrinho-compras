import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/database';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { AddressModule } from './address/address.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
