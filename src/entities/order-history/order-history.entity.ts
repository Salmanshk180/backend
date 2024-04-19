import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Products } from "../products/products.entity";
import { Addresses } from "../addresses/addresses.entity";
import { Users } from "../users/users.entity";

@Entity()
export class OrderHistory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "integer",
    nullable: false,
  })
  quantity: number;

  @Column({
    type: "integer",
    nullable: false,
  })
  total: number;

  @Column({
    type: "jsonb",
    nullable: false,
  })
  metadata: Array<Object>;

  @Column({
    type: "varchar",
    nullable: false,
  })
  order_status: string;

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

  @ManyToOne(() => Addresses, (address) => address.order,{eager:true})
  @JoinColumn({ name: "address_id" })
  address: Addresses;

  @ManyToOne(() => Users, (user) => user.order,{eager: true})
  @JoinColumn({ name: "user_id" })
  user: Users;
  constructor() {
    super();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.id = uuidv4();
  }
}
