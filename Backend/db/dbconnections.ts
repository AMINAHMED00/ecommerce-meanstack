import mongoose from "mongoose";

const dbconnection = mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");

dbconnection.then(() => console.log("db connected"))
            .catch((err) => console.log("db connection error", err));