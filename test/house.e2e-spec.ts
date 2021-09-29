import { ObjectId } from "@mikro-orm/mongodb";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import supertest from "supertest";
import { HouseController } from "../src/house/controller/house.controller";
import { CreateHouseDto } from "../src/house/dto/create-house.dto";
import { UpdateHouseDto } from "../src/house/dto/update-house.dto";
import { HouseService } from "../src/house/services/house.service";

describe("HouseController", () => {
  let app: INestApplication;
  const id: ObjectId = new ObjectId("4edd40c86762e0fb12000003");

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

  const mockHouseService = {
    create: jest.fn(() => Promise.resolve(id)),
    remove: jest.fn(() => Promise.resolve(1)),
    findAll: jest.fn(() => Promise.resolve([data])),
    findOne: jest.fn((id) => Promise.resolve({ id: id, ...data })),
    findDocOr404: jest.fn(() => Promise.resolve({})),
    update: jest.fn((id, dto) => Promise.resolve(1)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [
        {
          provide: HouseService,
          useValue: mockHouseService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );
    app.enableCors({ origin: "*" });

    await app.init();
  });

  it("/POST house", async () => {
    return supertest(app.getHttpServer())
      .post("/house")
      .send(data)
      .expect(201)
      .expect({ id: id.toString() });
  });

  it("/REMOVE house", async () => {
    return supertest(app.getHttpServer())
      .delete(`/house/${id}`)
      .expect(200)
      .expect({ message: "OK" });
  });

  it("/GET ALL house ", async () => {
    return supertest(app.getHttpServer())
      .get(`/house`)
      .expect(200)
      .expect([data]);
  });

  it("/GET ONE house ", async () => {
    return supertest(app.getHttpServer())
      .get(`/house/${id}`)
      .expect(200)
      .expect({ id: id.toString(), ...data });
  });

  it("/UPDATE ONE house ", async () => {
    const newData: UpdateHouseDto = {
      bedroom: 8,
      bathroom: 4,
    };
    return supertest(app.getHttpServer())
      .patch(`/house/${id}`)
      .send(newData)
      .expect(200)
      .expect({
        message: "ok",
        updated: 1,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
