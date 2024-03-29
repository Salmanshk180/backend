import { Router } from "express";
import { handleSignup } from "../controllers/authentication/handle-auth.controller";

export const router = Router();


router.post("/signup",handleSignup)