import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { Addresses } from "../../entities/addresses/addresses.entity";

export const delete_address = async (req: Request) => {
  try {
    const address_id = req.params.id;
    const address = await Addresses.findBy({ id: address_id });
    const deletedAddress = await Addresses.remove(address);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Address"),
      data: deletedAddress,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
