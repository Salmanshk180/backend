import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Carts } from "../carts/cart.entity";
import { Reviews } from "../reviews/reviews.entity";
import { Addresses } from "../addresses/addresses.entity";
import { OrderHistory } from "../order-history/order-history.entity";
import { Watchlist } from "../watchlist/watchlist.entity";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  first_name: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  last_name: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    type: "integer",
    nullable: true,
  })
  phone_number: number;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
  })
  role: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  updated_at: Date;

  constructor() {
    super();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.id = uuidv4();
  }

  @OneToMany(() => Carts, (cart) => cart.user, { onDelete: "CASCADE" })
  cart: Carts;
  
  @OneToMany(() => Watchlist, (list) => list.user, { onDelete: "CASCADE" })
  watchlist: Watchlist;

  @OneToMany(() => Addresses, (address) => address.user)
  address: Addresses;
  @OneToMany(() => OrderHistory, (order) => order.user)
  order: OrderHistory;

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews;
}
