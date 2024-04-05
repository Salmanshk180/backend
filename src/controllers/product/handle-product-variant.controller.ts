import { Request, Response } from "express";
import { product_variants } from "../../services/products/product-variants.services";
import { getProductVariants } from "../../services/products/get-product-variants.services";

export const handleProductVariants = async (req: Request, res: Response) => {
    const productResponse = await product_variants(req);
    return res.status(productResponse.statusCode).json({ message: productResponse.message, id: productResponse.id })
}

export const getAllProductVariants = async (req: Request, res: Response) => {
    const productResponse = await getProductVariants(req);    
    return res.status(productResponse.statusCode).json({ message: productResponse.message, data: productResponse.data })
}