import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { AppDataSource } from "../../database/database.configuration";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { Addresses } from "../../entities/addresses/addresses.entity";
import { Users } from "../../entities/users/users.entity";

export const Address = async (req: Request) => {
  const { building, street, city, state, pincode, country } = req.body;
  const user_id = req.params.id;
  try {
    if (!building || !city || !state || !pincode || !country) {
      throw new Error(ERROR_MESSAGE._NotFound("Address"));
    }
    const findAddress = await Addresses.findOne({
      where: {
        building: building,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
        user: { id: user_id },
      },
    });
    if (findAddress) {
      throw new Error(ERROR_MESSAGE._Conflict("Address"));
    }
    const addressRepo = AppDataSource.getRepository(Addresses);
    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error(ERROR_MESSAGE._Conflict("User"));
    }
    const address = new Addresses();
    address.building = building;
    address.street = street;
    address.city = city;
    address.state = state;
    address.pincode = pincode;
    address.country = country;
    address.user = user!;
    const addedAddress = await addressRepo.save(address);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Address"),
      id: addedAddress.id,
    };
  } catch (error: any) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: error.message,
    };
  }
};
