import { Request, Response } from "express";
import { carts } from "../../services/carts/cart.services";
import { getCarts } from "../../services/carts/get-carts.services";

export const handleCarts = async (req: Request, res: Response) => {
    const categoryResponse = await carts(req);
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data })
}

export const getAllCarts = async (req: Request, res: Response) => {
    const categoryResponse = await getCarts();
   return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data})
}