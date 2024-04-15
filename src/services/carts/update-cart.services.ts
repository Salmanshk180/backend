import { Request } from "express";
import { Carts } from "../../entities/carts/cart.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const update_cart = async (req: Request) => {
  try {
    const product_variant_id = req.query.product_variant_id?.toString();
    const quantity = req.query.quantity;

    const carts = await Carts.findOneBy({
      product_variants: { id: product_variant_id },
    });

    carts!.quantity = +quantity!;
    carts!.subtotal =
      Number(carts?.product_variants.discount_price) * +quantity!;

    const cart = await Carts.save(carts!);
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
