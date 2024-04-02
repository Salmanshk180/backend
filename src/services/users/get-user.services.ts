import { Request } from "express"
import { Users } from "../../entities/users/users.entity"
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants"
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants"

export const getUserFromId = async (req: Request) => {
    const id = req.params.id
    try {
        const user = await Users.findOne({ where: { id: id } })
        if (!user) {
            return { statusCode: HTTP_STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGE._NotFound("User") }

        }
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("User"), data: user }

    } catch (error) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGE._Bad_Request() }
    }
}