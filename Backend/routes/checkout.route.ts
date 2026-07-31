import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOrder, getMyOrders } from "../controllers/checkout.controller.js";

const checkoutRoute = Router() ;

checkoutRoute.post('/' , authMiddleware() , createOrder) ;
checkoutRoute.get('/myOrders' , authMiddleware() , getMyOrders);
export default checkoutRoute ;