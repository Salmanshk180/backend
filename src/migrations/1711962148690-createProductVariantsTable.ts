import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductVariantsTable1711962148690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_variants')
    }

}
