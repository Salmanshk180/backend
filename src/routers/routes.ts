import { Router } from "express";
import { handleLogin, handleSignup } from "../controllers/authentication/handle-auth.controller";
import { handleBrands } from "../controllers/brand/handle-brands.controller";
import { handleCategories } from "../controllers/category/handle-categories.controller";

export const router = Router();


router.post("/signup",handleSignup)
router.post("/login",handleLogin)
router.post("/brand",handleBrands)
router.post("/category",handleCategories)