import mongoose from "mongoose";
import { ref } from "node:process";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true,
        min:0
    },

    stock:{
        type:Number,
        required:true,
        default:0
    },

    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true
    },

    brand:{
        type:String
    },

    image:{
        type:String,
        default:""
    },

    rating:{
        type:Number,
        default:5,
        min:0,
        max:5
    },

    numReviews:{
        type:Number,
        default:0
    },

    isFeatured:{
        type:Boolean,
        default:false
    },

    isTrending:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

export const productModel = mongoose.model("Product",productSchema);