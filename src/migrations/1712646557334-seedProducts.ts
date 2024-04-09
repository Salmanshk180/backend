import { MigrationInterface, QueryRunner } from "typeorm";
import { Brands } from "../entities/brands/brands.entity";
import { Categories } from "../entities/categories/categories.entity";
import { Products } from "../entities/products/products.entity";

export class SeedProducts1712646557334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const brands = await queryRunner.manager.find(Brands);
        const categories = await queryRunner.manager.find(Categories);

        // Generate sample product data
        const productData = Array.from({ length: 30 }, (_, index) => {
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const product = new Products();
            product.name = `Product ${index + 1}`;
            product.brand = brand;
            product.category = category;
            product.created_at = new Date();
            product.updated_at = new Date();
            return product;
        });

        // Insert product data into the database
        await queryRunner.manager.save(Products, productData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
