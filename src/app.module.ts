import { Module } from '@nestjs/common';
import { HouseModule } from './house/house.module';

@Module({
  imports: [HouseModule],
})
export class AppModule {}
