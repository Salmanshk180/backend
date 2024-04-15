import { Request, Response } from "express";
import { carts } from "../../services/carts/cart.services";
import { getCarts } from "../../services/carts/get-carts.services";
import { update_cart } from "../../services/carts/update-cart.services";
import { delete_cart } from "../../services/carts/delete-cart.services";

export const handleCarts = async (req: Request, res: Response) => {
    const categoryResponse = await carts(req);
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data })
}

export const getAllCarts = async (req: Request, res: Response) => {
    const categoryResponse = await getCarts(req);
   return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data})
}
export const updateCart = async (req: Request, res: Response) => {
    const categoryResponse = await update_cart(req);
   return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data})
}
export const deleteCart = async (req: Request, res: Response) => {
    const categoryResponse = await delete_cart(req);
   return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data})
}