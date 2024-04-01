import { Users } from "../../entities/users/users.entity"
import { ERROR_MESSAGE } from "../../utils/constants/error-message.constants"
import { HTTP_STATUS_CODES } from "../../utils/constants/status-codes.constants"
import { SUCCESS_MESSAGES } from "../../utils/constants/success-message.constants"

export const getUsers = async () => {
    try {
        const users = await Users.find()
        return { statusCode: HTTP_STATUS_CODES.OK, message: SUCCESS_MESSAGES._Ok("Users"), data: users }

    } catch (error) {
        return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGE._Bad_Request() }
    }
}