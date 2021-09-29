import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { House } from "./house/entities/house.entity";
import { HouseModule } from "./house/house.module";

@Module({
  imports: [
    HouseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mongo",
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        entities: [House],
      }),
    }),
  ],
})
export class AppModule {}
