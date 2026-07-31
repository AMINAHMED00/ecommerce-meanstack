import { orderModel } from "../db/models/order.model.js";
import { cartModel } from "../db/models/cart.model.js";
import mongoose from "mongoose";
import { productModel } from "../db/models/product.model.js";

export class orderService {
    constructor(){}

    async createOrder(userId : string){
        const cart = await cartModel.findOne({user : userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            throw new Error("EmptyCart");
        }        

        try {

            let _totalPrice : number = 0 ;
            const orderItems : any[] = [] ;

            for(let i = 0 ; i < cart.items.length ; i++){
                const product = cart.items[i].product as any
                const quantity = cart.items[i].quantity ;

                _totalPrice += (product.price * quantity ) ;

                orderItems.push({
                    product : product._id ,
                    name : product.name ,
                    price : product.price ,
                    quantity : quantity
                });                
            }

            const order = await orderModel.create({
                user : userId ,
                items : orderItems ,
                totalPrice : _totalPrice ,
                status : "PENDING"
            });            

            for(let i = 0 ; i < cart.items.length ; i++){
                const product = cart.items[i].product as any ;
                const quantity  = cart.items[i].quantity ;

                const result = await productModel.updateOne(
                    {_id : product._id , stock : {$gte : quantity}},
                    {$inc : {stock : -quantity}}                    
                );

                if(result.matchedCount === 0){
                    throw new Error("OutOfStock");
                }
            }

            cart.items = [] as any;
            await cart.save();    

            return order ;
        }
        catch(err : any){           
            throw err ;
        }            
    }

    async getMyOrders(userId : string) {
        const orders = await orderModel.find({
            user : userId
        });

        if(orders.length === 0){
            throw new Error("Not Found");
        }

        return orders ;
    }
}