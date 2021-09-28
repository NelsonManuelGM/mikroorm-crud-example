import { Module } from "@nestjs/common";
import { HouseService } from "./services/house.service";
import { HouseController } from "./controller/house.controller";

@Module({
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
