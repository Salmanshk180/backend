import { Request } from "express";
import { Users } from "../../entities/users/users.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { AppDataSource } from "../../database/database.configuration";

export const updateUser = async (req: Request) => {
  try {
    const id = req.params.id;
    const firstname  = await req.body.first_name;
    const lastname  = await req.body.last_name;
    const email  = await req.body.email;
    const phone_number  = await req.body.phone_number;
    const user = await Users.findOne({ where: { id: id } });    
    if (!user) {
      throw new Error(ERROR_MESSAGE._NotFound("User"));
    }    
    user.first_name = firstname;
    user.last_name = lastname;
    user.email = email;
    user.phone_number = phone_number;
    const users = await Users.save(user);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Users"),
      data: users,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
