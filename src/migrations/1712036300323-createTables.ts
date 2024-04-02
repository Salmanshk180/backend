import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1712036300323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "users",
                    columns:
                        [
                            {
                                name: "id",
                                type: "uuid",
                                isPrimary: true,
                                isNullable: false,
                            },
                            {
                                name: "first_name",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "last_name",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "email",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "password",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "address",
                                type: "varchar",
                                isNullable: true,
                            },
                            {
                                name: "phone_number",
                                type: "integer",
                                isNullable: true,
                            },
                            {
                                name: "role",
                                type: "enum",
                                enum: ["admin", "user"],
                                default: "'user'",
                                isNullable: false,
                            },
                            {
                                name: "created_at",
                                type:"timestamp with time zone",
                                isNullable: false,
                            },
                            {
                                name: "updated_at",
                                type: 'timestamp with time zone',
                                isNullable: false,
                            }
                        ],
                }
            )
        )


        await queryRunner.createTable(
            new Table({
                name: "brands",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name:"images",
                        type:"json",
                        isNullable:true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "brand_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }
                ],
                foreignKeys: [
                    {
                        name: "brand_id",
                        columnNames: ["brand_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "brands",
                    },
                    {
                        name: "category_id",
                        columnNames: ["category_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "categories",
                    },
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "product_variants",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "images",
                        type: "json",
                        isNullable: false,
                    },
                    {
                        name: "color",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "price",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "discount_price",
                        type: "integer",
                        isNullable: true,
                    },

                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "in_stock",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "currency",
                        type: "enum",
                        enum: ["USD", "INR"],
                        isNullable: false,
                    },
                    {
                        name: "default",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }

                ],
                foreignKeys: [
                    {
                        name: "product_id",
                        columnNames: ["product_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "products",
                    },
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "carts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "quantity",
                        type: "integer",
                        isNullable: false,
                        default: 1,
                    },
                    {
                        name: "subtotal",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "product_variant_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }

                ],
                foreignKeys: [
                    {
                        name: "product_variant_id",
                        columnNames: ["product_variant_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "product_variants",
                    },
                    {
                        name: "user_id",
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                    },
                ]
            })
        )


        await queryRunner.createTable(
            new Table({
                name:"reviews",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true,
                        isNullable:false,
                    },
                    {
                        name:"description",
                        type:"varchar",
                        isNullable:false
                    },
                    {
                        name:"star",
                        type:"integer",
                        isNullable:false
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }
                ],
                foreignKeys:[
                    {
                        name: "product_id",
                        columnNames: ["product_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "products",
                    },
                    {
                        name: "user_id",
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reviews')
        await queryRunner.dropTable('carts')
        await queryRunner.dropTable('product_variants')
        await queryRunner.dropTable('products')
        await queryRunner.dropTable('categories')
        await queryRunner.dropTable('brands')
        await queryRunner.dropTable('users')
    }

}
