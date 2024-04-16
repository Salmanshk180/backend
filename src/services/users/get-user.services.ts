import { Request } from "express"
import { Users } from "../../entities/users/users.entity"
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants"
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants"
import { verifyToken } from "../../middlewares/auth-token.middlewares"

export const getUserFromId = async (req: Request) => {
    const token = req.query.token?.toString();
    const verify = verifyToken(token!)    
    try {
        const user = await Users.findOne({ where: { id: verify.id } })
        if (!user) {
            return { statusCode: HTTP_STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGE._NotFound("User") }
        }
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("User"), data: user }

    } catch (error) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGE._Bad_Request() }
    }
}