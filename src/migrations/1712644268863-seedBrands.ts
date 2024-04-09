import { MigrationInterface, QueryRunner } from "typeorm";
import { Brands } from "../entities/brands/brands.entity";

export class SeedBrands1712644268863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const brands = ["zara", "levi's", "allen solly", "peter england", "adidas", "fabindia"];

        // Start transaction
        await queryRunner.startTransaction();
        
        try {
            // Insert brands
            for (let brandName of brands) {
                const brand = new Brands();
                brand.name = brandName;
                
                // Logging the generated id before saving
                console.log('Generated ID:', brand.id);

                await queryRunner.manager.save(brand);
            }

            // Commit transaction
            await queryRunner.commitTransaction();
        } catch (err) {
            // Rollback transaction if an error occurs
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
