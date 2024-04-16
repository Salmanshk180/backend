import { Request, Response } from "express";
import { getUsers } from "../../services/users/get-users.services";
import { getUserFromId } from "../../services/users/get-user.services";
import { updateUser } from "../../services/users/update-user.services";
import { delete_user } from "../../services/users/delete-user.services";

export const getAllUsers = async (req: Request, res: Response) => {
    const userResponse = await getUsers();
    return res.status(userResponse.statusCode).json({ message: userResponse.message, data: userResponse.data })
}

export const getUser = async (req: Request, res: Response) =>{
    const userResponse = await getUserFromId(req);
    return res.status(userResponse.statusCode).json({ message: userResponse.message, data: userResponse.data })
}
export const updateUsers = async (req: Request, res: Response) =>{
    const userResponse = await updateUser(req);    
    return res.status(userResponse.statusCode).json({ message: userResponse.message, data: userResponse.data })
}
export const deleteUser = async (req: Request, res: Response) =>{
    const userResponse = await delete_user(req);    
    return res.status(userResponse.statusCode).json({ message: userResponse.message, data: userResponse.data })
}