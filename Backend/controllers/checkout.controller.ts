import { Request , Response } from "express"
import { orderService } from "../services/checkout.service.js"

const orderServices = new orderService() ;

export const createOrder = async(req : any , res : Response) =>{
    try {
        const userId = req.user.userId ;
        
        const order = await orderServices.createOrder(userId) ;

        res.status(201).json({
            msg : "Order placed successfully" ,
            order ,
        });
    }
    catch (err: any) {
        console.log(err);
        if (err.message === "EmptyCart") {
            return res.status(400).json({
                msg: "Your cart is empty",
            });
        }
        if (err.message === "OutOfStock") {
            return res.status(409).json({
                msg: "One or more items are out of stock",
            });
        }
        res.status(500).json({
            msg: "Server error",
            error: err,
        });
    }
}

export const getMyOrders = async(req : any , res : Response) =>{
    try {
        const userId = req.user.userId ;

        const orders = await orderServices.getMyOrders(userId) ;

        res.status(200).json({
            msg : "All Orders" ,
            orders
        });
    }
    catch(err : any ){
        if(err.message === "Not Found"){
            return res.status(200).json({
                msg : "No orders yet" ,
                orders  : []
            });
        }
        res.status(500).json({
            msg : "Server Error" ,
            error : err
        });
    }
}