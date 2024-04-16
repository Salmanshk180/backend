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
import { Users } from "../users/users.entity";

@Entity()
export class Addresses extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  building: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  street: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  city: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  state: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  pincode: number;
  @Column({
    type: "varchar",
    nullable: false,
  })
  country: string;

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

  @ManyToOne(() => Users, (user) => user.address)
  @JoinColumn({ name: "user_id" })
  user: Users;

  constructor() {
    super();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.id = uuidv4();
  }
}
