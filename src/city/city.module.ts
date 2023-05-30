import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { StateModule } from '../state/state.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), StateModule, CacheModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
