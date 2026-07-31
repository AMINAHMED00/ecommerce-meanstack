import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct  , getTrendingProducts, searchProducts, getAllCategory, getProductById} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const productRoute = Router() ;

productRoute.get('/' , getProducts);
productRoute.get("/trending", getTrendingProducts);
productRoute.get('/search' , searchProducts);
productRoute.get('/category' , getAllCategory);
productRoute.post('/create' , authMiddleware("ADMIN") , upload.single("image") ,addProduct);
productRoute.patch('/update/:id' , authMiddleware("ADMIN") , upload.single("image") , updateProduct);
productRoute.delete('/delete/:id' , authMiddleware("ADMIN") , deleteProduct);
productRoute.get('/:id' , getProductById);


export default productRoute ;