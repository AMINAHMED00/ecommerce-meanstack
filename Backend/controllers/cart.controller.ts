import { Request ,  Response } from "express";
import { cartService } from "../services/cart.service.js";


const cartServices = new cartService() ;

export const addToCart = async(req : any , res : Response) =>{
    try {
        const {productId , quantity} = req.body ;
        const userId = req.user.userId ;

        const cart = await cartServices.addToCart(userId , {productId , quantity}) ;
        res.status(201).json({
            msg : "Add Products Successfully" ,
            cart
        });
    }
    catch(err : any){
        res.status(500).json({
            msg : "Server Error" ,
            error : err
        });
    }
}

export const getMyCart = async(req : any , res : Response)=>{
    try {
        const userId = req.user.userId ;
        const cart = await cartServices.getMyCart(userId) ;

        res.status(200).json({
            msg : "My Cart" ,
            cart
        });
    }
    catch(err : any){
        if(err.message === "Not Found"){
            return res.status(404).json({
                msg : "Cart Not Founded"
            });
        }
        res.status(500).json({
            msg : "Server Error" ,
            error : err
        });
    }
}

export const UpdateCartItem = async(req : any , res : Response) =>{
    try {
        const userId = req.user.userId ;
        const productId = String(req.params.productId)
        const {quantity} = req.body ;
        const cart = await cartServices.updateCartItem(userId , {productId , quantity});    

        res.status(200).json({
            msg : "Updated Successfully" ,
            cart
        });
    }
    catch(err : any){
        if(err.message === "Not Found"){
            return res.status(404).json({
                msg : "Cart Not Founded"
            });
        }
        if(err.message === "Item Not Found"){
            return res.status(404).json({
                msg : "Item Not Founded"
            });
        }
        res.status(500).json({
            msg : "Server Error" ,
            error : err
        });
    }
}

export const removeFromCart = async(req : any  , res : Response) =>{
    try {
        const userId = req.user.userId ;
        const {productId} = req.params ;

        const cart = await cartServices.removeFromCart(userId , productId);

        res.status(200).json({
            msg : "Remove Product From Cart" ,
            cart
        });
    }
    catch(err : any){
        if(err.message === "Not Found"){
            return res.status(404).json({
                msg : "Cart Not Founded"
            });
        }
        if(err.message === "Item Not Found"){
            return res.status(404).json({
                msg : "Item Not Founded"
            });
        }
        res.status(500).json({
            msg : "Server Error" ,
            error : err
        });
    }
}