import { ObjectId } from "@mikro-orm/mongodb";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ObjectIdPipe } from "src/pipes/objectIdPipe";
import { CreateHouseDto } from "../dto/create-house.dto";
import { UpdateHouseDto } from "../dto/update-house.dto";
import { HouseService } from "../services/house.service";

@Controller("house")
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  async create(@Body() createHouseDto: CreateHouseDto) {
    try {
      return await this.houseService.create(createHouseDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ObjectIdPipe) id: ObjectId) {
    return this.houseService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ObjectIdPipe) id: ObjectId,
    @Body() updateHouseDto: UpdateHouseDto,
    @Res() res
  ) {
    await this.houseService.findDocOr404({ _id: id });

    await this.houseService.update(id, updateHouseDto);
    return res.status(200).json({ message: "ok" });
  }

  @Delete(":id")
  async remove(@Param("id", ObjectIdPipe) id: ObjectId) {
    const result = await this.houseService.remove(id);
    if (result === 0) {
      return { message: `There is no document with id: ${id}` };
    } else {
      return { message: "OK" };
    }
  }
}
