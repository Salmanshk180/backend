import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterReviewTable1713431703882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bandage.reviews ADD "product_variant_id" uuid`
    );
    await queryRunner.query(
      `UPDATE bandage.reviews SET "product_variant_id" = (SELECT "product_id" FROM bandage.products WHERE "products"."id" = bandage.reviews."product_id")`
    );
    await queryRunner.query(`ALTER TABLE bandage.reviews DROP COLUMN "product_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE bandage.reviews ADD "product_id" uuid`);
    await queryRunner.query(
      `UPDATE bandage.reviews SET "product_id" = (SELECT "product_variant_id" FROM "products" WHERE "products"."id" = bandage.reviews."product_variant_id")`
    );
    await queryRunner.query(
      `ALTER TABLE bandage.reviews DROP COLUMN "product_variant_id"`
    );
  }
}
