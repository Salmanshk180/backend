import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants";
import { AppDataSource } from "../../database/database.configuration";
import { Users } from "../../entities/users/users.entity";
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants";
import bcrypt from "bcryptjs"

export const signup = async (req: Request) => {
    const { firstname, lastname, email, password, role } = req.body;
    try {
        if (!firstname) {
            throw new Error(ERROR_MESSAGE._NotFound("firstname"))
        }
        else if (!lastname) {
            throw new Error(ERROR_MESSAGE._NotFound("lastname"))
        }
        else if (!email) {
            throw new Error(ERROR_MESSAGE._NotFound("email"))
        }
        else if (!password) {
            throw new Error(ERROR_MESSAGE._NotFound("password"))
        }
        const findUser = await Users.findOne({ where: { email: email } })
        if (findUser) {
            throw new Error(ERROR_MESSAGE._Conflict("User"))
        }
        const users = AppDataSource.getRepository(Users);
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new Users();
        user.first_name = firstname;
        user.last_name = lastname;
        user.email = email;
        user.password = hashedPassword;
        user.role = role || "User";
        const userCreated = await users.save(user);
        return { statusCode: HTTP_STATUS_CODES.CREATED, message: SUCCESS_MESSAGES._Created("User"), data: userCreated }
    } catch (error: any) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }
    }

}


