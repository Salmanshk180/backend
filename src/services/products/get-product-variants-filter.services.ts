import { Request } from "express";
import { AppDataSource } from "../../database/database.configuration";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { ProductVariants } from "../../entities/products/product-variants.entity";

export const getProductVariantsFilter = async (req: Request) => {
  try {
    const brands = (
      req.query.brand?.toString().toLowerCase().split(",") || []
    ).filter(Boolean);
    const category_name = req.query.category?.toString().toLowerCase();
    const minimum_price = req.query.min
      ? parseFloat(req.query.min.toString())
      : 0;
    const maximum_price = req.query.max
      ? parseFloat(req.query.max.toString())
      : 0;
    const productVariantRepository =
      AppDataSource.getRepository(ProductVariants);

    let query = productVariantRepository
      .createQueryBuilder("product_variant")
      .leftJoinAndSelect("product_variant.product", "product")
      .leftJoinAndSelect("product.brand", "brand")
      .leftJoinAndSelect("product.category", "category");

    if (brands.length > 0) {
      query = query.where("LOWER(brand.name) IN (:...brands)", { brands });
    }
    if (category_name !== "null") {
      query = query.andWhere("LOWER(category.name) = :category", {
        category: category_name,
      });
    }
    if (minimum_price !== 0 && maximum_price !== 0) {
      query = query
        .andWhere("product_variant.price >= :minimumprice", {
          minimumprice: minimum_price,
        })
        .andWhere("product_variant.price <= :maximumprice", {
          maximumprice: maximum_price,
        });
    }

    const products = await ProductVariants.find();
    const minimumprice = products.reduce(
      (min, product) => Math.min(min, product.price),
      Infinity
    );
    const maximumprice = products.reduce(
      (max, product) => Math.max(max, product.price),
      0
    );
    const productVariant = await query.getMany();
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variant"),
      data: {
        products: productVariant,
        total: productVariant.length,
        minimum_price: minimumprice,
        maximum_price: maximumprice,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
