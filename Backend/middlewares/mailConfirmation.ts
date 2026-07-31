import Nodemailer from "nodemailer" ;
import dotenv from "dotenv";
dotenv.config();

const transporter = Nodemailer.createTransport({
    service : "gmail", 
    auth : {
        user : process.env.EMAIL_USER ,
        pass : process.env.EMAIL_PASS
    }
});

export async function mailConfirmation(toEmail : string , name : string) {
    
    await transporter.sendMail({
        from : process.env.EMAIL_USER ,
        to : toEmail ,
        subject : "Welcom to E-commerce" ,
        text : `Hi ${name}, Welcomn to E-commerce Your account has been created successfully.`
    });
}