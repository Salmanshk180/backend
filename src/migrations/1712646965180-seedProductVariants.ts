import { MigrationInterface, QueryRunner } from "typeorm";
import { Currency } from "../types/types";
import { Products } from "../entities/products/products.entity";
import { ProductVariants } from "../entities/products/product-variants.entity";

export class SeedProductVariants1712646965180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const colors = ["red", "blue", "green", "black"];
        const defaultOptions = [true, false];
        const currency = Currency.USD;
        const inStockOptions = [true, false];
        const images = ['https://st3.depositphotos.com/2056297/14635/i/1600/depositphotos_146356345-stock-photo-fashion-male-model.jpg'];

        // Fetch all products from the database
        const products = await queryRunner.manager.find(Products);

        // Loop to create product variants for each product
        for (const product of products) {
            for (const color of colors) {
                // Create a new product variant instance
                const productVariant = new ProductVariants();
                productVariant.images = images as unknown as JSON;
                productVariant.color = color;
                productVariant.price = Math.floor(Math.random() * 100); // Random price
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

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
