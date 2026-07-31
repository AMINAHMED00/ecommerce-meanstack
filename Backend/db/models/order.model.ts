import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product : {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name : {
        type : String ,
        required : true ,
    },
    price: {
        type: Number,
        required: true,
        },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    _id : false
})

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId ,
        ref : "User" ,
        required : true ,
    } ,
    items : {
        type : [productSchema] ,
        required : true ,
    } ,
    totalPrice : {
        type : Number ,
        required : true ,
    } ,
    status : {
        type : String ,
        enum : ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] ,
        default : "PENDING",
    },
},{
    timestamps : true ,
});

export const orderModel = mongoose.model("Order" , orderSchema);