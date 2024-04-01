import { Request } from "express"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { Products } from "../../entities/products/products.entity";
import { AppDataSource } from "../../database/database.configuration";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { Brands } from "../../entities/brands/brands.entity";
import { Categories } from "../../entities/categories/categories.entity";

export const products = async (req: Request) => {
    const { name,brand_name, category_name } = req.body;
    const getProduct = await Products.findOne({ where: { name:name}})
    console.log(getProduct);
    
    try {
        if (!name) {
            throw new Error(ERROR_MESSAGE._NotFound("Product name"));
        }
        const findProduct = await Products.findOne({ where: { name: name } })
        if (findProduct) {
            throw new Error(ERROR_MESSAGE._Conflict("Product"))
        }
        const productsRepo = AppDataSource.getRepository(Products);
        const brand = await Brands.findOne({ where: { name:brand_name}})
        const category = await Categories.findOne({ where: { name:category_name}})
        const product = new Products();
        product.name = name;
        product.brand = brand!;
        product.category = category!;
        const addedProduct = await productsRepo.save(product);


        console.log();
        
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Product"), id: addedProduct.id }
    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }

    }
}