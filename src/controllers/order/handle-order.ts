import { Request, Response } from "express";
import { categories } from "../../services/categories/categories.services";
import { getCategories } from "../../services/categories/get-categories.services";
import { orderHistory } from "../../services/orders/orderHistroy";
import { getOrders } from "../../services/orders/get-orders";
import { getOrderById } from "../../services/orders/get-order-by-id";

export const handleOrder = async (req: Request, res: Response) => {
    const orderResponse = await orderHistory(req);
    return res.status(orderResponse.statusCode).json({ message: orderResponse.message, id: orderResponse.id })
}

export const getOrder = async (req: Request, res: Response) => {
    const orderResponse = await getOrders(req);    
    return res.status(orderResponse.statusCode).json({ message: orderResponse.message, data: orderResponse.data })
}
export const getOrderByIds = async (req: Request, res: Response) => {
    const orderResponse = await getOrderById(req);    
    return res.status(orderResponse.statusCode).json({ message: orderResponse.message, data: orderResponse.data })
}