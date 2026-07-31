import { Request , Response } from "express"; 
import { productService } from "../services/product.service.js";


const productServices = new productService();

export const addProduct = async(req : Request , res : Response)=>{
    try {
        const data = req.body ;
        const image = req.file?.filename || "" ;
        const product = await productServices.addProduct(data , image);

        res.status(201).json({
            msg : "Add Product Successfully" ,
            product
        });
    }
    catch(err:any){
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const getProducts = async(req : Request , res : Response) =>{
    try {       
        const products = await productServices.getProducts();
        if(products.length ===0){
            return res.status(401).json({
                msg : "Not Found Products"
            });
        }
        res.status(200).json({
            msg : "All Products" ,
            products
        });
    }
    catch(err:any){
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const deleteProduct = async(req : Request , res : Response)=>{
    try{
        const productId = String(req.params.id) ;
        await productServices.deleteProduct(productId);

        res.status(200).json({
            msg : "Product Deleted Successfully"
        });
    }
    catch(err:any){
        if(err.message == "Not Found"){
            return res.status(404).json({
                msg : "Product Not Found"
            });
        }
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const updateProduct = async(req : Request , res : Response)=>{
    try {
        const newData = req.body ;
        const productId = String(req.params.id);

        const result = await productServices.updateProduct(productId , newData);

        res.status(200).json({
            msg : "Product Updated Successfullt" ,
            result
        });
    }
    catch(err : any){
        if(err.message === "Not Found"){
            return res.status(404).json({
                msg : "Product Not Found",
            });
        }
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const createCategory = async(req : Request , res : Response) =>{
    try {
        const data = req.body ;
        const category = await productServices.createCategory(data);
        res.status(201).json({
            msg : "Create Category Successfully"
        });
    }
    catch(err : any){
        res.status(500).json({
            msg : "Server Error" ,
            error : err.message
        });
    }
}

export const getAllCategory = async (req : Request , res : Response) =>{
    try {
        const categories = await productServices.getAllCategory() ;
        res.status(200).json({categories});
    }
    catch(err:any){
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const getTrendingProducts = async(req : Request , res : Response) =>{
    try {
        const products = await productServices.getTrendingProducts() ;
        res.status(200).json({
            msg : "Trending Products",
            products
        });
    }
    catch(err:any){
        res.status(500).json({
            msg : "Server Error"
        });
    }
}

export const searchProducts = async (req : Request , res : Response) =>{
    try { 
        const search = req.query ;
        console.log(search);
        const products = await productServices.searchProducts(search);

        res.status(200).json({products});
    }
    catch(err : any){
        console.log(err);
        res.status(500).json({ msg: "Server error", error: err });
    }
}

export const getProductById = async(req : Request , res : Response) =>{
    try {
        const productId  = String(req.params.id) ;
        const product = await productServices.getProductById(productId) ;

        res.status(200).json({product});
    }
    catch(err : any){
        if(err.message === "Not Found"){
            return res.status(404).json({
                msg : "Product Not Found",
            });
        }
        res.status(500).json({
            msg : "Server Error" ,
            error : err.message
        });
    }
}