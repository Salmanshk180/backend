import { Request } from "express";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const getProduct = async (req: Request) => {
  try {
    const id = req.params.id;
    const product = await ProductVariants.findOne({
      where: { id: id },
    });
    const product_variants = await ProductVariants.find({
      where: { product: { id: product?.product.id } },
    });
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variants"),
      data: {
        product: product,
        product_variants: product_variants,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
