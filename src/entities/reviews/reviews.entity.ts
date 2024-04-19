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
import { Products } from "../products/products.entity";
import { ProductVariants } from "../products/product-variants.entity";

@Entity()
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  description: string;

  @Column({
    type: "integer",
    nullable: false,
  })
  star: number;

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

  @ManyToOne(() => Users, (user) => user.reviews,{eager: true})
  @JoinColumn({ name: "user_id" })
  user: Users;

  @ManyToOne(() => ProductVariants, (product) => product.reviews,{eager: true})
  @JoinColumn({ name: "product_variant_id" })
  product_variant: ProductVariants;
  constructor() {
    super();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.id = uuidv4();
  }
}
