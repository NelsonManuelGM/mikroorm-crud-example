import { HttpException, HttpStatus } from "@nestjs/common";
import { ObjectId } from "@mikro-orm/mongodb";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateHouseDto } from "../dto/create-house.dto";
import { UpdateHouseDto } from "../dto/update-house.dto";
import { HouseService } from "./house.service";

const data: CreateHouseDto = {
  address: {
    postalCode: 159456,
    apartment: 4545,
    street: "asdasd adas ad asd a",
  },
  bedroom: 2,
  bathroom: 2,
  squareFeeds: 1024,
  kitchen: 2,
  patio: true,
  balcony: false,
};
const mockedID = ObjectId("6153259603856e55d4ef5f65");

describe("HouseService", () => {
  let service: HouseService;

  const mockEntityRepository = {
    count: jest.fn(() => {
      throw new HttpException("Document doesn't exist!", HttpStatus.NOT_FOUND);
    }),
    flush: jest.fn(() => Promise.resolve({})),
    nativeInsert: jest.fn((dto) => Promise.resolve(mockedID.toString())),
    nativeDelete: jest.fn((id) => Promise.resolve(1)),
    find: jest.fn(() =>
      Promise.resolve([{ id: mockedID.toString(), ...data }])
    ),
    findOne: jest.fn((id) => ({ id: id._id.toString(), ...data })),
    nativeUpdate: jest.fn((id, dto) => ({ message: "ok" })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: "HouseRepository",
          useValue: mockEntityRepository,
        },
      ],
    }).compile();

    service = module.get<HouseService>(HouseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a house and return id", async () => {
    const result = await service.create(data);
    expect(result).toEqual("6153259603856e55d4ef5f65");
  });

  it("should remove a house and return ok", async () => {
    const result = await service.remove(mockedID);
    expect(result).toEqual(1);
  });

  it("should retrieve all items", async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: mockedID.toString(), ...data }]);
  });

  it("should retrieve one element by Id", async () => {
    const result = await service.findOne(mockedID);
    expect(result).toEqual({ id: "6153259603856e55d4ef5f65", ...data });
  });

  it("should update one by Id", async () => {
    const modifications: UpdateHouseDto = {
      bathroom: 3,
      kitchen: 1,
    };

    const result = await service.update(mockedID, modifications);
    expect(result).toEqual({ message: "ok" });
  });

  it("should trow an exception", async () => {
    try {
      await service.findDocOr404({});
    } catch (error) {
      expect(error).toEqual(
        new HttpException("Document doesn't exist!", HttpStatus.NOT_FOUND)
      );
    }
  });
});
