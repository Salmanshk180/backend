import { Request, Response } from "express";
import { Address } from "../../services/address/address.services";
import { getAddress } from "../../services/address/get-address.services";
import { delete_address } from "../../services/address/delete-address.services";
import { update_address } from "../../services/address/update-address.services";

export const handleAddresses = async (req: Request, res: Response) => {
  const addressResponse = await Address(req);
  return res
    .status(addressResponse.statusCode)
    .json({ message: addressResponse.message, data: addressResponse.id });
};
export const getAddresses = async (req: Request, res: Response) => {
  const addressResponse = await getAddress(req);
  return res
    .status(addressResponse.statusCode)
    .json({ message: addressResponse.message, data: addressResponse });
};
export const deleteAddresses = async (req: Request, res: Response) => {
  const addressResponse = await delete_address(req);
  return res
    .status(addressResponse.statusCode)
    .json({ message: addressResponse.message, data: addressResponse });
};
export const updateAddress = async (req: Request, res: Response) => {
  const addressResponse = await update_address(req);
  return res
    .status(addressResponse.statusCode)
    .json({ message: addressResponse.message, data: addressResponse });
};
