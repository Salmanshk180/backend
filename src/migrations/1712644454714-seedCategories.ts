import { MigrationInterface, QueryRunner } from "typeorm";
import { Categories } from "../entities/categories/categories.entity";

export class SeedCategories1712644454714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      "men's clothing",
      "women's clothing",
      "footwear",
      "watches",
      "beauty",
      "kid's clothing",
      "handbags",
      "jwellery",
    ];

    // Start transaction
    await queryRunner.startTransaction();

    try {
      // Insert brands
      for (let categoryName of categories) {
        const category = new Categories();
        category.name = categoryName;

        // Logging the generated id before saving
        console.log("Generated ID:", category.id);

        await queryRunner.manager.save(category);
      }

      // Commit transaction
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
