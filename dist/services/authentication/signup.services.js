"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const error_message_constants_1 = require("../../utils/constants/error-message.constants");
const status_codes_constants_1 = require("../../utils/constants/status-codes.constants");
const database_configuration_1 = require("../../database/database.configuration");
const users_1 = require("../../entities/users/users");
const success_message_constants_1 = require("../../utils/constants/success-message.constants");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!firstname) {
            throw new Error(error_message_constants_1.ERROR_MESSAGE._NotFound("firstname"));
        }
        else if (!lastname) {
            throw new Error(error_message_constants_1.ERROR_MESSAGE._NotFound("lastname"));
        }
        else if (!email) {
            throw new Error(error_message_constants_1.ERROR_MESSAGE._NotFound("email"));
        }
        else if (!password) {
            throw new Error(error_message_constants_1.ERROR_MESSAGE._NotFound("password"));
        }
        const users = database_configuration_1.AppDataSource.getRepository(users_1.Users);
        const user = new users_1.Users();
        user.first_name = firstname;
        user.last_name = lastname;
        user.email = email;
        user.password = password;
        const userCreated = yield users.save(user);
        return { statusCode: status_codes_constants_1.HTTP_STATUS_CODES.CREATED, message: success_message_constants_1.SUCCESS_MESSAGES._Created("User"), data: userCreated };
    }
    catch (error) {
        // return { statusCode: HTTP_STATUS_CODES.BAD_REQUEST, message: error.message }
        return { statusCode: status_codes_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, message: error_message_constants_1.ERROR_MESSAGE._Bad_Request() };
    }
});
exports.signup = signup;
