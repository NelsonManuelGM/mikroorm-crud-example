import { Module } from "@nestjs/common";
import { HouseService } from "./services/house.service";
import { HouseController } from "./controller/house.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { House } from "./entities/house.entity";

@Module({
  controllers: [HouseController],
  providers: [HouseService],
  imports: [MikroOrmModule.forFeature([House])],
})
export class HouseModule {}
