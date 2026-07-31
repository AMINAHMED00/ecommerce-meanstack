import { Request , Response } from "express";
import bcrypt from 'bcrypt';
import { userService } from "../services/user.service.js"; 
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv" ;
import { mailConfirmation } from "../middlewares/mailConfirmation.js";
dotenv.config();

const userServices = new userService();

// signup
export const Signup = async(req : Request , res : Response)=>{
   try {
        const data = req.body ;
        const existUser = await userServices.getUserByEmail(data.email);        

        if(!existUser){
            const user = await userServices.Register(data);
            const {password : _ , ...safeUser} = user ;
            mailConfirmation(user.email , String(user.name)).catch((err)=>{
                console.error("Failed to send Confirmation email:", err);
            });
            return res.status(201).json({msg :"User Rigestered Successfully" , safeUser});
        }

        res.status(409).json({msg : "User Already Exist"});
   }
   catch(err : any){
    console.log("error : ", err);
        res.status(500).json({msg : "Server Error" , error : err});
   }
}

//login
export const login = async(req : Request , res : Response)=>{
    try {
        const {email , password} = req.body ;
        const find_user = await userServices.getUserByEmail(email);

        if(!find_user){
            return res.status(401).json({
                msg : "User Not Found , please Register",
            });
        }

        const check_pass = await bcrypt.compare(password , find_user.password);
        if(!check_pass){
            return res.status(401).json({
                msg : "Invalid Password"
            });
        }
        const token = Jwt.sign(
            {userId:find_user.id , role : find_user.role} ,
            process.env.JWT_SECRET!,
            {expiresIn : "7d"}
        );

        const {password : _ , ...safeUser} = find_user.toObject() ;

        res.status(200).json({
            msg : "Login Succssful" ,
            user : safeUser ,
            token : token
        });
    }
    catch(err : any){
        res.status(500).json({
            msg : "Server Error" ,
            error : err.message
        })
    }
}

export const getUsers = async(req : Request , res : Response)=>{
    try{
        const users = await userServices.getUsers();
        res.status(200).json({msg : "All Users" , users});
    }
    catch(err : any){
        res.status(500).json({msg : "Server Error" , error : err});
    }
}


export const deleteUser = async(req : Request , res : Response)=>{
    try {
        const userId = String(req.params.id) ;
        const user = await userServices.getUserById(userId);

        if(user){
            await userServices.deleteUser(userId);
            return res.json({msg : "User Deleted Successfully"});
        }
        res.json({msg :"User Not Founded"});
    }
    catch(err : any){
        res.status(500).json({msg : "Server Error" , error : err});
    }
}

export const updateUser = async(req : Request , res : Response)=>{
    try{
        const userId = String(req.params.id);
        const data = req.body ;
        const user = await userServices.getUserById(userId);

        if(user){
            await userServices.updateUser(userId ,data);
            return res.status(200).json({msg : "Updated User Successfully"});
        }
        res.json({msg : "User Not Found"});
    }
    catch(err : any){
        res.status(500).json({msg : "Server Error" , error : err});
    }
}
