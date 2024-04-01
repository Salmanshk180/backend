import { ProductVariants } from "../../entities/products/product-variants.entity"
import { Products } from "../../entities/products/products.entity"
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants"
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants"

export const getProductVariants = async () => {
    try {
        const productVariant = await ProductVariants.find()
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Product Variant"), data: productVariant }

    } catch (error) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGE._Bad_Request() }
    }
}