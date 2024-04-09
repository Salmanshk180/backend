import { Router } from "express";
import { handleLogin, handleSignup } from "../controllers/authentication/handle-auth.controller";
import { getAllBrands, handleBrands } from "../controllers/brand/handle-brands.controller";
import { getAllCategories, handleCategories } from "../controllers/category/handle-categories.controller";
import { getAllProducts, handleProducts } from "../controllers/product/handle-product.controller";
import { getAllUsers, getUser } from "../controllers/user/handle-user.controlles";
import { getProductVariantsAll, handleProductVariants } from "../controllers/product/handle-product-variant.controller";
import { getAllCarts, handleCarts } from "../controllers/cart/cart.controller";
import { getReviews, handleReview } from "../controllers/review/handle-review.controller";
import {  getFilterProductVariants } from "../controllers/product/handle-product-variant.controller";

export const router = Router();

router.post("/signup", handleSignup)
router.post("/login", handleLogin)
router.get("/users", getAllUsers)
router.post("/brand", handleBrands)
router.get("/brand", getAllBrands)
router.post("/category", handleCategories)
router.get("/category", getAllCategories)
router.post("/product", handleProducts)
router.get("/product", getAllProducts)
router.post("/product-variant", handleProductVariants)
router.get("/product-variant", getProductVariantsAll)
router.get("/product-variant-filter", getFilterProductVariants)
router.post("/cart",handleCarts)
router.get("/cart", getAllCarts)
router.post("/review",handleReview)
router.get("/review", getReviews)
router.get("/user/:id", getUser)