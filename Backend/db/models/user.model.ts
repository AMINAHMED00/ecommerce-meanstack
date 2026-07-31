import mongoose from "mongoose";

export enum ROLE {
  USER = "USER",  
  ADMIN = "ADMIN"
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type : String ,
        required : true,
        unique : true
    },
    password: {
        type : String ,
        required : true
    },
    role : {
        type : String ,
        enum : Object.values(ROLE),
        default : ROLE.USER
    }, 
    isVerified: {
    type: Boolean,
    default: false
    }
},{
    timestamps : true
});

export const UserModel = mongoose.model("User", userSchema);