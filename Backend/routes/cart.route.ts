import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addToCart, getMyCart, removeFromCart, UpdateCartItem } from "../controllers/cart.controller.js";

const cartRoute = Router() ;

cartRoute.post("/add", authMiddleware(), addToCart);

cartRoute.get("/myCart", authMiddleware(), getMyCart);

cartRoute.patch("/update/:productId", authMiddleware(), UpdateCartItem);

cartRoute.delete("/remove/:productId", authMiddleware(), removeFromCart);

export default cartRoute ;