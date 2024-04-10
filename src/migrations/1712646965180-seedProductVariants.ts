import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Currency } from '../types/types';
import { Products } from '../entities/products/products.entity';
import { ProductVariants } from '../entities/products/product-variants.entity';
import { SizeType } from '../types/types';

export class SeedProductVariants1712646965180 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('product_variants', new TableColumn({
            name: 'size',
            type: 'enum',
            enum: ['small', 'medium', 'large', 'extra large'],
            default: "'medium'", // You can set a default size if needed
        }));

        const colors = ['red', 'blue', 'green', 'black'];
        const sizes = Object.values(SizeType); // Get values of SizeType enum
        const defaultOptions = [true, false];
        const currency = Currency.USD;
        const inStockOptions = [true, false];
        const images = ['https://st3.depositphotos.com/2056297/14635/i/1600/depositphotos_146356345-stock-photo-fashion-male-model.jpg'];

        // Fetch all products from the database
        const products = await queryRunner.manager.find(Products);

        // Loop to create product variants for each product
        for (const product of products) {
            for (const color of colors) {
                // Randomly decide whether to include this color or not
                if (Math.random() < 0.5) continue; // 50% chance of skipping this color

                for (const size of sizes) { // Loop through sizes
                    // Randomly decide whether to include this size or not
                    if (Math.random() < 0.5) continue; // 50% chance of skipping this size

                    // Create a new product variant instance
                    const productVariant = new ProductVariants();
                    productVariant.images = images as unknown as JSON;
                    productVariant.color = color;
                    productVariant.size = size; // Assign size value
                    productVariant.price = Math.floor(Math.random() * 91) + 9; // Random price between $9 and $99
                    productVariant.discount_price = Math.floor(Math.random() * productVariant.price); // Random discount price
                    productVariant.description = 'Lorem ipsum';
                    productVariant.in_stock = inStockOptions[Math.floor(Math.random() * 2)]; // Randomly choose true or false for in_stock
                    productVariant.currency = currency;
                    productVariant.default = defaultOptions[Math.floor(Math.random() * 2)]; // Randomly choose true or false for default
                    productVariant.product = product;
                    productVariant.created_at = new Date();
                    productVariant.updated_at = new Date();

                    // Save the product variant to the database
                    await queryRunner.manager.save(productVariant);
                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // You can add the logic for reverting the migration here if needed
    }
}
