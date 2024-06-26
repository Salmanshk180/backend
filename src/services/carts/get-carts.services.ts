import { Request } from "express";
import { Carts } from "../../entities/carts/cart.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { verifyToken } from "../../middlewares/auth-token.middlewares";

export const getCarts = async (req: Request) => {
  try {
    const token = req.query.token?.toString();
    const user = verifyToken(token!);    
    const carts = await Carts.findBy({ user: { id: user.id } });
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Carts"),
      data: carts,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
