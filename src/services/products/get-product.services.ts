import { Request } from "express";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { SizeType } from "../../types/types";

export const getProduct = async (req: Request) => {
  try {
    const color = req.query.color?.toString();
    const size = req.query.size?.toString();    
    const product_id = req.query.productid?.toString();    
    let product = await ProductVariants.findOne({
      where: {product:{id:product_id},color: color},
    });    
    if(size !=="undefined"){
       product = await ProductVariants.findOne({
        where: {product:{id:product_id},color: color,size: size as SizeType},
      });

    }
    const productVariants = await ProductVariants.find({where:{product:{id: product_id}}})
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Product Variants"),
      data: {
        product: product,
        product_variants: productVariants,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGE._Bad_Request(),
    };
  }
};
