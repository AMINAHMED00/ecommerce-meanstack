import { UserModel } from "../db/models/user.model.js";
import bcrypt from 'bcrypt';

interface createUser {
    name: string,
    age: number,
    email: string,
    password: string
}
interface updateUser {
    name?: string,
    age?: number,
    email?: string,
    password?: string
}

export class userService {
    constructor(){}

    async Register(data : createUser){
        const hashpass = await bcrypt.hash(data.password , 10);
        return await UserModel.insertOne({
            name : data.name ,
            age : data.age,
            email : data.email ,
            password : hashpass
        });
    }

    async getUserByEmail(email : string){
        return await UserModel.findOne({email : email});
    }

    async getUsers(){
        return await UserModel.find();
    }

    async getUserById(userId : string){
        return await UserModel.findOne({_id : userId});
    }

    async deleteUser(userId : string){
        return await UserModel.deleteOne({_id : userId});
    }

    async updateUser(userId : string , data :updateUser){
        return await UserModel.updateOne({_id : userId} , {...data});
    }
}