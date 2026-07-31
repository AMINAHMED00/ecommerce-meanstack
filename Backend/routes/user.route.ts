import { Router } from "express";
import { deleteUser, getUsers, login, Signup, updateUser ,verifyEmail } from "../controllers/user.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const userRoute = Router();

userRoute.get('/' , getUsers);
userRoute.get('/verify-email/:token', verifyEmail);
userRoute.post('/signup' , authLimiter ,  Signup);
userRoute.post('/login' , authLimiter , login) ;
userRoute.delete('/delete/:id' , deleteUser);
userRoute.patch('/update/:id' , updateUser);

export default userRoute ;