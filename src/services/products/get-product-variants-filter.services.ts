import { Request } from "express";
import { AppDataSource } from "../../database/database.configuration";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { Products } from "../../entities/products/products.entity";

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
    const _default = Boolean(req.query.default);
    const sortby = req.query.sortby;
    const page = Number(req.query.page!);
    const limit = Number(req.query.limit!);

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
    if (category_name !== "null" && category_name !== "all") {
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
    if (_default) {
      query = query.andWhere("product_variant.default = :default", {
        default: _default,
      });
    }
    if (sortby == "asc") {
      query = query.addOrderBy("product_variant.price", "ASC");
    }
    if (sortby == "desc") {
      query = query.addOrderBy("product_variant.price", "DESC");
    }

    const total = (await query.getMany()).length;
    let skip = (page - 1) * limit;
    if (page && limit) {
      query = query.skip(skip).take(limit);
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
    const productIds = productVariant.map((variant) => variant.product.id);
    const productVariantswithProducts = await Promise.all(
      productIds.map(async (productId) => {
        return await ProductVariants.find({
          where: { product: { id: productId } },
        });
      })
    );
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variant"),
      data: {
        products: productVariant,
        total: total,
        minimum_price: minimumprice,
        maximum_price: maximumprice,
        productVariants: productVariantswithProducts,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
