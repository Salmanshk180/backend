import { Router } from "express";
import {
  handleLogin,
  handleSignup,
} from "../controllers/authentication/handle-auth.controller";
import {
  getAllBrands,
  handleBrands,
} from "../controllers/brand/handle-brands.controller";
import {
  getAllCategories,
  handleCategories,
} from "../controllers/category/handle-categories.controller";
import {
  getAllProducts,
  getOneproduct,
  handleProducts,
} from "../controllers/product/handle-product.controller";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUsers,
} from "../controllers/user/handle-user.controlles";
import {
  getProductVariantsAll,
  handleProductVariants,
} from "../controllers/product/handle-product-variant.controller";
import {
  deleteCart,
  getAllCarts,
  handleCarts,
  updateCart,
} from "../controllers/cart/cart.controller";
import {
  getReviews,
  handleReview,
} from "../controllers/review/handle-review.controller";
import { getFilterProductVariants } from "../controllers/product/handle-product-variant.controller";
import { deleteAddresses, getAddresses, handleAddresses, updateAddress } from "../controllers/address/handle-address.controller";

export const router = Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/users", getAllUsers);
router.post("/brand", handleBrands);
router.get("/brand", getAllBrands);
router.post("/category", handleCategories);
router.get("/category", getAllCategories);
router.post("/products", handleProducts);
router.get("/products", getAllProducts);
router.post("/product-variant", handleProductVariants);
router.get("/product-variant", getProductVariantsAll);
router.get("/product-variant-filter", getFilterProductVariants);
router.get("/product", getOneproduct);
router.post("/cart", handleCarts);
router.get("/cart", getAllCarts);
router.patch("/cart", updateCart);
router.delete("/cart", deleteCart);
router.post("/review", handleReview);
router.get("/review", getReviews);
router.post("/address/:id", handleAddresses);
router.get("/address/:id", getAddresses);
router.delete("/address/:id", deleteAddresses);
router.patch("/user/:id", updateUsers);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/address/:id", updateAddress);
