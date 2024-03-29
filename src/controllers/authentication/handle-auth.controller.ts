import { Request, Response } from "express"
import { signup } from "../../services/authentication.services"


export const handleSignup = async(req: Request, res: Response) => {
    const response =await signup(req, res)
}