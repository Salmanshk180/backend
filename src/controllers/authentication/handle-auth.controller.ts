import { Request, Response } from "express";
import { signup } from "../../services/authentication/signup.services";
import { login } from "../../services/authentication/login.services";

export const handleSignup = async (req: Request, res: Response) => {
  const signupResponse = await signup(req);
  return res
    .status(signupResponse.statusCode)
    .json({ message: signupResponse.message, id: signupResponse.data?.id });
};

export const handleLogin = async (req: Request, res: Response) => {
  const loginResponse = await login(req, res);
  return res
    .status(loginResponse.statusCode)
    .json({ message: loginResponse.message, token: loginResponse.token,user: loginResponse.user});
};
