import { Request, Response } from "express";
import { getUsers } from "../../services/users/get-users.services";

export const getAllUsers = async (req: Request, res: Response) => {
    const userResponse = await getUsers();
    return res.status(userResponse.statusCode).json({ message: userResponse.message, data: userResponse.data })
}