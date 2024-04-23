import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWatchList1713885140375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "watchlist",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("watchlist");
    }

}
