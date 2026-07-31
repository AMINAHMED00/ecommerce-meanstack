import { orderModel } from "../db/models/order.model.js";
import { cartModel } from "../db/models/cart.model.js";
import mongoose from "mongoose";
import { productModel } from "../db/models/product.model.js";

export class orderService {
    constructor(){}

    async createOrder(userId : string){
        const cart = await cartModel.findOne({user : userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            throw new Error("Empty Cart");
        }

        const session = await mongoose.startSession();
        session.startTransaction();

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
                    quantity : product.quantity
                });                
            }

            const orderArr = await orderModel.create([{
                user : userId ,
                items : orderItems ,
                totalPrice : _totalPrice ,
                status : "PENDING"
            } ], {session});

            const order = orderArr[0] ;

            for(let i = 0 ; i < cart.items.length ; i++){
                const product = cart.items[i].product as any ;
                const quantity  = cart.items[i].quantity ;

                const result = await productModel.updateOne(
                    {_id : product._id , stock : {$gte : quantity}},
                    {$inc : {stock : -quantity}} ,
                    {session}
                );

                if(result.matchedCount === 0){
                    throw new Error("OutOfStock");
                }
            }

            cart.items = [] as any;
            await cart.save({session});
            await session.abortTransaction() ;

            return order ;
        }
        catch(err : any){
            await session.abortTransaction() ;
            throw err ;
        }
        finally {
            session.endSession();
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