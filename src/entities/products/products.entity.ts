import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Brands } from "../brands/brands.entity";
import { Categories } from "../categories/categories.entity";
import { ProductVariants } from "./product-variants.entity";
import { Reviews } from "../reviews/reviews.entity";

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

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


    @ManyToOne(() => Brands, (brand) => brand.products, { onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: "brand_id" })
    brand: Brands

    @ManyToOne(() => Categories, (category) => category.products, { onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: "category_id" })
    category: Categories

    @OneToMany(() => ProductVariants, (product_variant) => product_variant.product, {
        cascade: true,
    })
    product_variants: ProductVariants[];

    @OneToMany(() => Reviews, (review) => review.product)
    reviews: Reviews;
    
    constructor() {
        super();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.id = uuidv4();
    }
}
