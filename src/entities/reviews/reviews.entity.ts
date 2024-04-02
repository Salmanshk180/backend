import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../users/users.entity";
import { Products } from "../products/products.entity";

@Entity()
export class Reviews extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'integer',
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
    
    @ManyToOne(()=>Users,(user)=>user.reviews)
    @JoinColumn({name:"user_id"})
    user:Users

    @ManyToOne(()=>Products,(product)=>product.reviews)
    @JoinColumn({name:"product_id"})
    product:Products
    constructor() {
        super();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.id = uuidv4();
    }


}
