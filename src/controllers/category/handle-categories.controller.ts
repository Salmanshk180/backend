import { Request, Response } from "express";
import { categories } from "../../services/categories/categories.services";

export const handleCategories = async (req: Request, res: Response) => {
    const categoryResponse = await categories(req);
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, id: categoryResponse.id })
}