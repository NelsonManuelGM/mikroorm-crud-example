// import {} from "@mikro-orm/mongodb";

import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

class Address {
  @Property({ nullable: false })
  postalCode: number;

  @Property({ nullable: false })
  @Unique()
  apartment!: number;

  @Property({ nullable: false })
  street: string;
}
@Entity()
export class House {
  @Property({ nullable: false })
  address: Address;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property({ nullable: false })
  bedroom: number;

  @Property({ nullable: false })
  bathroom: number;

  @Property({ nullable: false })
  squareFeeds: number;

  @Property({ nullable: false })
  kitchen: number;

  @Property({})
  patio: boolean;

  @Property({})
  balcony: boolean;
}
