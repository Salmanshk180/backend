import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ProductVariants } from "../products/product-variants.entity";
import { Users } from "../users/users.entity";

@Entity()
export class Watchlist extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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


   @OneToOne(()=>ProductVariants,(products)=>products.cart,{eager:true})
   @JoinColumn({name:"product_variant_id"})
   product_variants : ProductVariants

   @OneToOne(()=>Users,(user)=>user.cart,{cascade:true})
   @JoinColumn({name:"user_id"})
   user : Users

    constructor() {
        super();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.id = uuidv4();
    }
}
