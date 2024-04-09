import { ProductVariants } from "../../entities/products/product-variants.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const getAllProductVariants = async () => {
  try {
    const products = await ProductVariants.find();
    const minimum_price = products.reduce(
      (min, product) => Math.min(min, product.price),
      Infinity
    );
    const maximum_price = products.reduce(
      (max, product) => Math.max(max, product.price),
      0
    );
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variants"),
      data: {
        // products: products,
        minimum_price: minimum_price,
        maximum_price: maximum_price,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
