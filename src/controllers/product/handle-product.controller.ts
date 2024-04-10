import { Request, Response } from "express";
import { products } from "../../services/products/products.services";
import { getProducts } from "../../services/products/get-products.services";
import { getProduct } from "../../services/products/get-product.services";

export const handleProducts = async (req: Request, res: Response) => {
  const productResponse = await products(req);
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, id: productResponse.id });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const productResponse = await getProducts();
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, data: productResponse.data });
};

export const getOneproduct = async (req: Request, res: Response) => {
  const productResponse = await getProduct(req);
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, data: productResponse.data });
};

