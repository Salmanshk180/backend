import { Request } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { AppDataSource } from "../../database/database.configuration";
import { Brands } from "../../entities/brands/brands.entity";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";

export const brands = async (req: Request) => {
    const { name } = req.body;
    try {
        if (!name) {
            throw new Error(ERROR_MESSAGE._NotFound("Brand name"))
        }
        const findBrand = await Brands.findOne({ where: { name: name } })
        if (findBrand) {
            throw new Error(ERROR_MESSAGE._Conflict("Brand"))
        }
        const brandRepo = AppDataSource.getRepository(Brands);
        const brand = new Brands();
        brand.name = name;
        const addedBrand = await brandRepo.save(brand);
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Brand"), id: addedBrand.id }
    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }
    }
}