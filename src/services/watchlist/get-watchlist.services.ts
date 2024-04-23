import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { verifyToken } from "../../middlewares/auth-token.middlewares";
import { Watchlist } from "../../entities/watchlist/watchlist.entity";

export const getWatchList = async (req: Request) => {
  try {
    const token = req.query.token?.toString();
    const user = verifyToken(token!);    
    const watchlist = await Watchlist.findBy({ user: { id: user.id } });
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Watchlist"),
      data: watchlist,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
