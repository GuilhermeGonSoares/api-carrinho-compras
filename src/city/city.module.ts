import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { StateModule } from '../state/state.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 90000000,
    }),
    TypeOrmModule.forFeature([City]),
    StateModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
