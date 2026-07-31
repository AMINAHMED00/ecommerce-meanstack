import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true 
    },
    description: {
        type: String,
    },
},{
    timestamps : true
});

export const categoryModel = mongoose.model("Category" , categorySchema);

