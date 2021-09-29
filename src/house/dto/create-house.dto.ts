import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

class Address {
  @IsNotEmpty()
  @IsNumber()
  postalCode: number;

  @IsNotEmpty()
  @IsNumber()
  apartment: number;

  @IsNotEmpty()
  @IsString()
  street: string;
}
export class CreateHouseDto {
  @IsNotEmpty()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty()
  @IsNumber()
  bedroom: number;

  @IsNotEmpty()
  @IsNumber()
  bathroom: number;

  @IsNotEmpty()
  @IsNumber()
  squareFeeds: number;

  @IsNotEmpty()
  @IsNumber()
  kitchen: number;

  @IsOptional()
  @IsBoolean()
  patio: boolean;

  @IsOptional()
  @IsBoolean()
  balcony: boolean;
}
