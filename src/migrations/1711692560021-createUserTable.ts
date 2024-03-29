import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1711692560021 implements MigrationInterface {

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
