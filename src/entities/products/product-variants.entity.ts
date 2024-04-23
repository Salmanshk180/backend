import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Brands } from "../brands/brands.entity";
import { Categories } from "../categories/categories.entity";
import { Currency, SizeType } from "../../types/types";
import { Products } from "./products.entity";
import { Carts } from "../carts/cart.entity";
import { Reviews } from "../reviews/reviews.entity";
import { Watchlist } from "../watchlist/watchlist.entity";

@Entity()
export class ProductVariants extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'json',
        nullable: false,
    })
    images: JSON;
    
    @Column({
        type: 'varchar',
        nullable: false,
    })
    color: string;

    @Column()
    size: SizeType;

    @Column({
        type: 'integer',
        nullable: false,
    })
    price: number;

    @Column({
        type: 'integer',
        nullable: true,
    })
    discount_price: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    in_stock: boolean;

    @Column({
        type: 'enum',
        enum:["USD","INR"],
        nullable: false,
    })
    currency: Currency;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    default: boolean;

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


    @ManyToOne(() => Products, (product) => product.product_variants, { onDelete: "CASCADE" ,eager: true})
    @JoinColumn({ name: "product_id" })
    product: Products

    @OneToOne(() => Carts, (product) => product.product_variants)
    cart: Carts
    
    @OneToOne(() => Watchlist, (product) => product.product_variants)
    watchlist: Watchlist
    
    @OneToMany(() => Reviews, (review) => review.product_variant)
    reviews: Reviews;

    constructor() {
        super();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.id = uuidv4();
    }
}
