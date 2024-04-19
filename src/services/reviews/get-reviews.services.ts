import { Reviews } from "../../entities/reviews/reviews.entity";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { Request } from "express";

export const getAllReviews = async (req: Request) => {
  try {
    const product_variant_id = req.params?.id.toString();    
    const reviews = await Reviews.find({
      where: { product_variant: { id: product_variant_id } },
    });

    let totalRatings = 0;
    for (const review of reviews) {
      totalRatings += review.star;
    }
    const averageRating = Math.round(totalRatings / reviews.length);

    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Reviews"),
      data: {reviews:reviews, averageRating:averageRating, numberOfReviews:reviews.length},
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
