import { Categories } from "../../entities/categories/categories.entity";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const getCategories = async () => {
    try {
        // Fetch categories sorted by name in ascending order
        const categories = await Categories.createQueryBuilder("category")
            .orderBy("category.name", "ASC")
            .getMany();

        return { 
            statusCode: HTTP_STATUS_CODES.OK, 
            message: SUCCESS_MESSAGES._Ok("Categories"), 
            data: categories 
        };

    } catch (error) {
        return { 
            statusCode: HTTP_STATUS_CODES.BAD_REQUEST, 
            message: ERROR_MESSAGE._Bad_Request() 
        };
    }
};
