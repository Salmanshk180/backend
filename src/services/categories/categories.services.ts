import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { Categories } from "../../entities/categories/categories.entity";
import { AppDataSource } from "../../database/database.configuration";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const categories = async (req: Request) => {
    const { name } = req.body;
    try {
        if (!name) {
            throw new Error(ERROR_MESSAGE._NotFound("Category name"))
        }
        const findCategory = await Categories.findOne({ where: { name: name } })
        if (findCategory) {
            throw new Error(ERROR_MESSAGE._Conflict("Category"))
        }
        const categoryRepo = AppDataSource.getRepository(Categories);
        const category = new Categories();
        category.name = name;
        const addedCategory = await categoryRepo.save(category);
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Category"), id: addedCategory.id }
    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }
    }

}