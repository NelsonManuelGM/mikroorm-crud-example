import { MikroORM } from "@mikro-orm/core";
import { EntityManager, EntityRepository, ObjectId } from "@mikro-orm/mongodb";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateHouseDto } from "../dto/create-house.dto";
import { UpdateHouseDto } from "../dto/update-house.dto";
import { House } from "../entities/house.entity";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: EntityRepository<House>
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    const newHouse = await this.houseRepository.nativeInsert(createHouseDto);
    this.houseRepository.flush();
    return newHouse;
  }

  findAll() {
    return this.houseRepository.find({});
  }

  findOne(id: ObjectId) {
    return this.houseRepository.findOne({ _id: id });
  }

  async update(id: ObjectId, updateHouseDto: UpdateHouseDto) {
    return this.houseRepository.nativeUpdate({ _id: id }, updateHouseDto);
  }

  remove(id: ObjectId) {
    return this.houseRepository.nativeDelete({ _id: id });
  }

  async findDocOr404(query: any) {
    const count = await this.houseRepository.count(query);
    if (count === 0) {
      throw new HttpException("Document does'n exist!", HttpStatus.NOT_FOUND);
    }
  }
}
