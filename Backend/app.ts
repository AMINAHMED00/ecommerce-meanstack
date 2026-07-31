import dotenv from "dotenv" ;
dotenv.config();
import express from 'express' ;
import userRoute from './routes/user.route.js';
import checkoutRoute from './routes/checkout.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import categoryRoute from "./routes/category.route.js";
import cors from 'cors'
import path from 'path';
import "./db/dbconnections.js";

const port = 2005 ;

const app = express() ;

app.use(cors());
app.use("/uploads" , express.static(path.join(process.cwd() , "uploads")));

app.use(express.json());
dotenv.config();

// user
app.use( '/api/users' , userRoute);

//product
app.use('/api/products' , productRoute);

//cart
app.use('/api/cart' , cartRoute);

//checkout
app.use('/api/checkout' , checkoutRoute);

//Category
app.use('/api/category' , categoryRoute);

app.listen(port , ()=>{
    console.log(`server running at => http://localhost:${port} ;`);
});