import { Request } from "express";
import { Addresses } from "../../entities/addresses/addresses.entity";
import { Brands } from "../../entities/brands/brands.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const getAddress = async (req: Request) => {
  try {
    const id = req.params.id;
    const address = await Addresses.find({ where: { user: { id: id } } });
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Address"),
      data: address,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
