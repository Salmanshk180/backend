import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import { OrderHistory } from "../../entities/order-history/order-history.entity";
import { ProductVariants } from "../../entities/products/product-variants.entity";
import { Reviews } from "../../entities/reviews/reviews.entity";

interface MetadataItem {
  product_variant_id: string;
}

export const getOrderById = async (req: Request) => {
  try {
    const id = req.params.id;
    const order = await OrderHistory.findOne({ where: { id: id } });

    if (!order) {
      throw new Error(ERROR_MESSAGE._NotFound("Order"));
    }

    const modifiedMetadata = await Promise.all(
      order.metadata.map(async (metadataItem: any) => {
        const productVariantId = metadataItem.product_variant_id;
        const productVariant = await ProductVariants.findOne({
          where: { id: productVariantId },
        });

        if (!productVariant) {
          throw new Error(ERROR_MESSAGE._NotFound("Product Variant"));
        }
        const review = await Reviews.findOne({
          where: {
            product_variant: { id: productVariant.id },
            user: { id: order.user.id },
          },
        });
        const modifiedMetadataItem: MetadataItem = {
          ...metadataItem,
          product_variant: productVariant,
          star: review?.star,
        };

        return modifiedMetadataItem;
      })
    );
    order.metadata = modifiedMetadata;
    return {
      statusCode: HTTP_STATUS_CODES.OK,
      message: SUCCESS_MESSAGES._Ok("Orders"),
      data: {
        order: order,
      },
    };
  } catch (error) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      message: (error as Error).message || ERROR_MESSAGE._Bad_Request(),
    };
  }
};
