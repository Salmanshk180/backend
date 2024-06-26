import { Request } from "express";
import { AppDataSource } from "../../database/database.configuration";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { Users } from "../../entities/users/users.entity";
import { Carts } from "../../entities/carts/cart.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { verifyToken } from "../../middlewares/auth-token.middlewares";

export const carts = async (req: Request) => {
  const product_variant_id = req.query.product_variant_id?.toString();
  const token = req.query.token?.toString();
  try {
    const findProductVariants = await ProductVariants.findOne({
      where: { id: product_variant_id },
    });
    const retreiveUser = verifyToken(token!);
    const cartRepo = AppDataSource.getRepository(Carts);
    const findUser = await Users.findOne({ where: { id: retreiveUser.id } });
    if (!findProductVariants) {
      throw new Error(ERROR_MESSAGE._NotFound("Product Variant"));
    }
    if (!findUser) {
      throw new Error(ERROR_MESSAGE._NotFound("User"));
    }

    const findProductInCart = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.product_variants", "product_variants")
      .where("product_variants.id = :product_variant_id", {
        product_variant_id: findProductVariants.id,
      })
      .andWhere("cart.user_id = :user_id", { user_id: findUser.id })
      .getOne();

    if (findProductInCart) {
      findProductInCart.quantity += 1;
      if (findProductVariants.discount_price!==null) {
        findProductInCart.subtotal =
          findProductVariants.discount_price * findProductInCart.quantity;
      } else {
        findProductInCart.subtotal =
          findProductVariants.price * findProductInCart.quantity;
      }
      await cartRepo.save(findProductInCart);
      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Cart Updated"),
        data: findProductInCart,
      };
    } else {
      const cart = new Carts();
      cart.product_variants = findProductVariants!;
      if(findProductVariants.discount_price!==null){
        cart.subtotal = findProductVariants!.discount_price;
      }
      else{
        cart.subtotal = findProductVariants!.price;
      }
      cart.user = findUser!;
      const addedCart = await cartRepo.save(cart);
      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Cart"),
        data: addedCart,
      };
    }
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
