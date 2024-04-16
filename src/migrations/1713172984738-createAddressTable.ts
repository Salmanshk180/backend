import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddressTable1713172984738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "building",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "street",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "pincode",
            type: "integer",
            isNullable: false,
          },
          {
            name: "country",
            type: "varchar",
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
            type: "timestamp with time zone",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "user_id",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
