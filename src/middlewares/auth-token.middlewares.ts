import jwt from "jsonwebtoken";
import { User } from "../types/types";
export const generateToken = (user: User) => {
    return jwt.sign({ ...user }, process.env.JWT_SECRET_KEY!);
};
export const verifyToken = (token: string) => {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decode as User;
};
