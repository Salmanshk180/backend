import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { AppDataSource } from "../../database/database.configuration";
import { Users } from "../../entities/users/users.entity";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import bcrypt from "bcryptjs"
import { generateToken } from "../../middlewares/auth-token.middlewares";
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            throw new Error(ERROR_MESSAGE._NotFound("Email"))
        }
        else if (!password) {
            throw new Error(ERROR_MESSAGE._NotFound("Password"))
        }
        const usersRepo = AppDataSource.getRepository(Users)
        const findUser = await usersRepo.findOne({ where: { email: email } });
        if (!findUser) {
            throw new Error(ERROR_MESSAGE._NotFound("User"))
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (!passwordMatch) {
            throw new Error(ERROR_MESSAGE._NotMatch("Password"))
        }
        const token = generateToken(findUser)
        res.cookie("token", token)
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("User Loggedin"), token: token }

    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }
    }
}