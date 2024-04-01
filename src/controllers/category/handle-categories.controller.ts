import { Request, Response } from "express";
import { categories } from "../../services/categories/categories.services";
import { getCategories } from "../../services/categories/get-categories.services";

export const handleCategories = async (req: Request, res: Response) => {
    const categoryResponse = await categories(req);
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, id: categoryResponse.id })
}

export const getAllCategories = async (req: Request, res: Response) => {
    const categoryResponse = await getCategories();
    console.log(categoryResponse.data);
    
    return res.status(categoryResponse.statusCode).json({ message: categoryResponse.message, data: categoryResponse.data })
}