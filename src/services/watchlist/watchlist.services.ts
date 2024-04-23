import { Request } from "express";
import { AppDataSource } from "../../database/database.configuration";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { Users } from "../../entities/users/users.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { verifyToken } from "../../middlewares/auth-token.middlewares";
import { Watchlist } from "../../entities/watchlist/watchlist.entity";

export const watchlist = async (req: Request) => {
  const product_variant_id = req.query.product_variant_id?.toString();
  const token = req.query.token?.toString();
  try {
    const findProductVariants = await ProductVariants.findOne({
      where: { id: product_variant_id },
    });
    const retreiveUser = verifyToken(token!);
    const watchlistRepo = AppDataSource.getRepository(Watchlist);
    const findUser = await Users.findOne({ where: { id: retreiveUser.id } });
    if (!findProductVariants) {
      throw new Error(ERROR_MESSAGE._NotFound("Product Variant"));
    }
    if (!findUser) {
      throw new Error(ERROR_MESSAGE._NotFound("User"));
    }

    // Check if the product exists in the user's watchlist
    const existingWatchlistEntry = await watchlistRepo.findOne({
      where: {
        user:{id:findUser.id},
        product_variants:{id: findProductVariants.id},
      },
    });

    if (existingWatchlistEntry) {
      // If the product exists in the watchlist, remove it
      await watchlistRepo.delete(existingWatchlistEntry.id);
      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Product removed from watchlist"),
        data: null,
      };
    } else {
      // If the product doesn't exist in the watchlist, add it
      const newWatchlistEntry = new Watchlist();
      newWatchlistEntry.user = findUser;
      newWatchlistEntry.product_variants = findProductVariants;
      await watchlistRepo.save(newWatchlistEntry);
      
      return {
        statusCode: HTTP_STATUS_CODES.OK,
        message: SUCCESS_MESSAGES._Ok("Product added to watchlist"),
        data: newWatchlistEntry,
      };
    }
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
