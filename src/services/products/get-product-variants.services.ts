import { Request } from "express";
import { getRepository } from "typeorm";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { Products } from "../../entities/products/products.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { AppDataSource } from "../../database/database.configuration";

export const getProductVariants = async (req: Request) => {
  try {
    const brands = req.query.brand?.toString().toLowerCase().split(","); // Splitting into array if multiple brands are provided
    const category_name = req.query.category?.toString().toLowerCase();
    const productVariantRepository =
      AppDataSource.getRepository(ProductVariants);
    if ((brands?.length == 0 || brands![0] == "") && category_name == "null") {
      const productVariant = await productVariantRepository.find();
      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Product Variant"),
        data: productVariant,
      };
    }

    if ((brands?.length == 0 || brands![0] == "") && category_name !== "null") {
      const productVariant = await productVariantRepository
        .createQueryBuilder("product_variant")
        .leftJoinAndSelect("product_variant.product", "product")
        .leftJoinAndSelect("product.brand", "brand")
        .leftJoinAndSelect("product.category", "category")
        .where("LOWER(category.name) = :category", { category: category_name }) // Using IN operator with array of brands
        .getMany();

      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Product Variant"),
        data: productVariant,
      };
    }

    const productVariant = await productVariantRepository
      .createQueryBuilder("product_variant")
      .leftJoinAndSelect("product_variant.product", "product")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.category", "category")
      .where("LOWER(brand.name) IN (:...brands)", { brands }) // Using IN operator with array of brands
      .andWhere("LOWER(category.name) = :category", { category: category_name })
      .getMany();

    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variant"),
      data: productVariant,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
