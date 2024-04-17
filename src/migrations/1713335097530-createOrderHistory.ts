import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderHistory1713335097530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_history",
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
                    },
                    {
                        name: "total",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "metadata",
                        type: "jsonb",
                        isNullable: false,
                    },
                    {
                        name: "address_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },  
                    {
                        name: "order_status",
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

                ],
                foreignKeys: [
                    {
                        name: "address_id",
                        columnNames: ["address_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "addresses",
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
        await queryRunner.dropTable("order_history");
    }

}
