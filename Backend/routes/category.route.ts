import { Router } from "express";
import { createCategory } from "../controllers/product.controller.js";

const categoryRoute = Router();

categoryRoute.post('/create' , createCategory);

export default categoryRoute ;