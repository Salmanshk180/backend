import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    first_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    last_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    address: string;

    @Column({
        type: "integer",
        nullable: true,
    })
    phone_number: number;

    @Column({
        type: "enum",
        enum: ["admin", "user"]
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
}
