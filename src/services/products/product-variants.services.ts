import { Request } from "express"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { Products } from "../../entities/products/products.entity";
import { AppDataSource } from "../../database/database.configuration";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { ProductVariants } from "../../entities/products/product-variants.entity";

export const product_variants = async (req: Request) => {
    const { images, color, price, discount_price, description, in_stock, currency, _default, product_name } = req.body;
    try {
        if (!color) {
            throw new Error(ERROR_MESSAGE._NotFound("Color"));
        }
        if (!price) {
            throw new Error(ERROR_MESSAGE._NotFound("Price"));
        }
        if (!description) {
            throw new Error(ERROR_MESSAGE._NotFound("Description"));
        }
        if (in_stock===undefined) {
            throw new Error(ERROR_MESSAGE._NotFound("in_stock"));
        }
        if (!currency) {
            throw new Error(ERROR_MESSAGE._NotFound("Currency"));
        }
        if (_default===undefined) {
            throw new Error(ERROR_MESSAGE._NotFound("_default"));
        }
        // const findProduct = await Products.findOne({ where: { name: name } })
        // if (findProduct) {
        //     throw new Error(ERROR_MESSAGE._Conflict("Product"))
        // }
        const productsRepo = AppDataSource.getRepository(ProductVariants);
        const product = await Products.findOne({ where: { name: product_name } })
        const product_variant = new ProductVariants();
        product_variant.color = color;
        product_variant.images = images;
        product_variant.currency = currency;
        product_variant.description = description;
        product_variant.price = price;
        product_variant.discount_price = discount_price;
        product_variant.default = _default;
        product_variant.in_stock = in_stock;
        product_variant.product = product!;
        const addedProductVariant = await productsRepo.save(product_variant);
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Product Variant"), id: addedProductVariant.id }
    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }

    }
}