import { cartModel } from "../db/models/cart.model.js";

interface itemSchema {
    productId : string ,
    quantity : number
}

export class cartService {
    constructor(){}

    async addToCart(userId : string , data : itemSchema){

        let cart = await cartModel.findOne({user : userId});

        if(!cart){
            cart = await cartModel.create({user : userId , items : [] });
        }

        const existingItemIndex = cart.items.findIndex((item)=> item.product.toString() === data.productId) ;
        if(existingItemIndex > -1){
            cart.items[existingItemIndex].quantity += data.quantity
        }
        else {
            cart.items.push({product : data.productId , quantity : data.quantity});
        }
        await cart.save() ;
        return cart ;
    }

    async getMyCart(userId : string){
        const cart = await cartModel.findOne({user : userId}).populate("items.product");

        if(!cart){
            throw new Error("Not Found");
        }

        return cart ;
    }

    async updateCartItem(userId : string , data : itemSchema){
        let cart = await cartModel.findOne({user : userId}).populate("items.product");

        if(!cart){
            throw new Error("Not Found");
        }

        const existingItemIndex  = cart.items.findIndex((item)=> (item.product as any)._id.toString() === data.productId);

        if(existingItemIndex === -1){
            throw new Error("Item Not Found");
        }

        if(data.quantity <= 0 ){
            cart.items.splice(existingItemIndex , 1);
        }
        else {
            cart.items[existingItemIndex].quantity = data.quantity ;
        }

        await cart.save();

        return cart ;
    }

    async removeFromCart(userId : string , productId : string){
        let cart = await cartModel.findOne({user : userId});

        if(!cart){
            throw new Error("Not Found");
        }

        const existingItemIndex = cart.items.findIndex((item)=> item.product.toString() === productId);

        if(existingItemIndex === -1){
            throw new Error("Item Not Found");
        }

        cart.items.splice(existingItemIndex , 1) ;

        await cart.save();

        return cart ;
    }
}