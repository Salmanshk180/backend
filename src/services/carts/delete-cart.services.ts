import { Request } from "express";
import { Carts } from "../../entities/carts/cart.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const delete_cart = async (req: Request) => {
  try {
    const cart_id = req.query.cart_id?.toString();
    const carts = await Carts.findBy({id:cart_id});
    const cart = await Carts.remove(carts);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Carts"),
      data: cart,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
