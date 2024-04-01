import { Request, Response } from "express";
import { products } from "../../services/products/products.services";

export const handleProducts = async (req: Request, res: Response) => {
    const productResponse = await products(req);
    return res.status(productResponse.statusCode).json({ message: productResponse.message, id: productResponse.id })
}