import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { Categories } from "../../entities/categories/categories.entity";
import { AppDataSource } from "../../database/database.configuration";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { OrderHistory } from "../../entities/order-history/order-history.entity";
import { Addresses } from "../../entities/addresses/addresses.entity";
import { Users } from "../../entities/users/users.entity";
import { Carts } from "../../entities/carts/cart.entity";

export const orderHistory = async (req: Request) => {
  const id = req.params.id.toString();
  const { quantity, total, metadata, address_id } = req.body;
  try {
    const findUser = await Users.findOne({where:{ id: id } });
    if (!findUser) {
      throw new Error(ERROR_MESSAGE._NotFound("User"));
    }
    const orderRepo = AppDataSource.getRepository(OrderHistory);
    const address = await Addresses.findOne({ where: { id: address_id } });
    const order = new OrderHistory();
    order.quantity = quantity;
    order.total = total;
    order.metadata = metadata;
    order.address = address!;
    order.user = findUser!;
    order.order_status = "success";
    const addedOrder = await orderRepo.save(order);

    const carts = await Carts.findBy({user:{id: addedOrder.user.id}});
    const cart = await Carts.remove(carts);
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Order"),
      id: addedOrder.id,
    };
  } catch (error: any) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: error.message,
    };
  }
};
