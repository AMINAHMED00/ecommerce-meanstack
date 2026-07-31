import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOrder } from "../controllers/checkout.controller.js";

const checkoutRoute = Router() ;

checkoutRoute.post('/' , authMiddleware() , createOrder) ;

export default checkoutRoute ;