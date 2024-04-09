import { Request, Response } from "express";
import { product_variants } from "../../services/products/product-variants.services";
import { getAllProductVariants } from "../../services/products/get-product-variants.services";
import { getProductVariantsFilter } from "../../services/products/get-product-variants-filter.services";

export const handleProductVariants = async (req: Request, res: Response) => {
  const productResponse = await product_variants(req);
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, id: productResponse });
};

export const getProductVariantsAll = async (req: Request, res: Response) => {
  const productResponse = await getAllProductVariants();
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, data: productResponse.data });
};
export const getFilterProductVariants = async (req: Request, res: Response) => {
  const productResponse = await getProductVariantsFilter(req);
  return res
    .status(productResponse.statusCode)
    .json({ message: productResponse.message, data: productResponse.data });
};
