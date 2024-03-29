import { Request, Response } from "express"
import { signup } from "../../services/authentication/signup.services"


export const handleSignup = async (req: Request, res: Response) => {
    const response = await signup(req, res)
    return res.status(response.statusCode).json({ message: response.message, id: response.data?.id })
}