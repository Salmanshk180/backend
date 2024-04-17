import { Request, Response } from "express";
import { categories } from "../../services/categories/categories.services";
import { getCategories } from "../../services/categories/get-categories.services";
import { orderHistory } from "../../services/orders/orderHistroy";

export const handleOrder = async (req: Request, res: Response) => {
    const orderResponse = await orderHistory(req);
    return res.status(orderResponse.statusCode).json({ message: orderResponse.message, id: orderResponse.id })
}

export const getOrder = async (req: Request, res: Response) => {
    const categoryResponse = await getCategories();    
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data })
}