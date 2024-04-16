import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { Addresses } from "../../entities/addresses/addresses.entity";

export const update_address = async (req: Request) => {
  try {
    const address_id = req.params.id;
    const {building,street,city,state,pincode,country} = req.body;    
    const address = await Addresses.findOneBy({id:address_id});
     if(!building || !street || !city || !state || !pincode || !country){
        throw new Error("Please enter data properly")
     }
     
    address!.building = building!;
    address!.street = street!;
    address!.city = city!;
    address!.pincode=+pincode!;
    address!.state = state!;
    address!.country = country;
    const updatedAddress = await Addresses.save(address!);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Address"),
      data: updatedAddress,
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
