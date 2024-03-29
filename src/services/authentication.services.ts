import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../utils/constants/error-message.constants";
import { HTTP_STATUS_CODES } from "../utils/constants/status-codes.constants";

export const signup = (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        if(!firstname){
        throw new Error(ERROR_MESSAGE._NotFound("firstname"))
    }
       if(!lastname){
           throw new Error(ERROR_MESSAGE._NotFound("lastname"))
        }
        if(!email){
            throw new Error(ERROR_MESSAGE._NotFound("email"))
        }
        if(!password){
            throw new Error(ERROR_MESSAGE._NotFound("password"))
        }

        
    } catch (error: any) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: error.message })
    }
    
}



// export const signup = (req: Request, res: Response) => {
//     const { firstname, lastname, email, password } = req.body;
//     const required_fields = ["firstname", "lastname", "email", "password"];
//     try {
//         const missing_fields = required_fields.find((field) => !req.body[field])
//         if (missing_fields) {
//             throw new Error(ERROR_MESSAGE._NotFound(missing_fields))
//         }
//     } catch (error: any) {
//         return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: error.message })
//     }

// }