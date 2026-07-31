import { NextFunction, Request , Response } from "express";
import  Jwt  from "jsonwebtoken";
import { ROLE } from "../db/models/user.model.js";

interface JwtPayload  {
    userId : string ,
    role : ROLE
}

export const authMiddleware = (role ?: string)=>{
        return (req : Request & {user ?:JwtPayload} , res:Response , next : NextFunction) =>{

        const authHeader = req.headers.authorization ;
        
        if(!authHeader){
            return res.status(401).json({
                msg : "Not Token Provided"
            });
        }

        const token = authHeader.split(" ")[1];

        try{
            const payload = Jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload;

            req.user = payload ;

            // check role..
            if(role !== undefined && role !== payload.role){
                return res.status(403).json({
                    msg : "Forbidden"
                });
            }

            next();
        }
        catch(err:any){
            res.status(401).json({
                msg : "Invaled Token"
            });
        }
    }
}