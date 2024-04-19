import { Request } from "express";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { AppDataSource } from "../../database/database.configuration";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { Reviews } from "../../entities/reviews/reviews.entity";
import { Users } from "../../entities/users/users.entity";
import { Products } from "../../entities/products/products.entity";
import { ProductVariants } from "../../entities/products/product-variants.entity";

export const reviews = async (req: Request) => {
  const { description, star, user_id, product_variant_id } = req.body;
  try {
    if (!description) {
      throw new Error(ERROR_MESSAGE._NotFound("Description"));
    }
    if (!star) {
      throw new Error(ERROR_MESSAGE._NotFound("Star"));
    }
    const findUser = await Users.findOne({ where: { id: user_id } });
    if (!findUser) {
      throw new Error(ERROR_MESSAGE._NotFound("User"));
    }
    const findProduct = await ProductVariants.findOne({
      where: { id: product_variant_id },
    });
    if (!findProduct) {
      throw new Error(ERROR_MESSAGE._NotFound("Product Variant"));
    }
    const reviewRepo = AppDataSource.getRepository(Reviews);
    const review = new Reviews();
    review.description = description;
    review.star = star;
    review.user = findUser;
    review.product_variant = findProduct;
    const addedReview = await reviewRepo.save(review);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variant Review"),
      id: addedReview.id,
    };
  } catch (error: any) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: error.message,
    };
  }
};
