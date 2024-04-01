import { Request, Response } from "express";
import { brands } from "../../services/brands/brands.services";
import { getBrands } from "../../services/brands/get-brands.services";

export const handleBrands = async (req: Request, res: Response) => {
    const brandsResponse = await brands(req);
    return res.status(brandsResponse.statusCode).json({ message: brandsResponse.message, id: brandsResponse.id });
}

export const getAllBrands = async (req: Request, res: Response) => {
    const brandsResponse = await getBrands();
    return res.status(brandsResponse.statusCode).json({ message: brandsResponse.message, data: brandsResponse.data });

}