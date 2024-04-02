import { Reviews } from "../../entities/reviews/reviews.entity";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";

export const getAllReviews = async()=>{
    try {
        const reviews = await Reviews.find()
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Reviews"), data: reviews }
    } catch (error) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGE._Bad_Request() }
    }
}