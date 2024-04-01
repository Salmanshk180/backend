import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsTable1711950249047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
