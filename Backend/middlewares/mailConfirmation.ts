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

export async function mailConfirmation(toEmail : string , name : string , token : string) {

    const verifyLink = `http://localhost:2005/api/users/verify-email/${token}`;
    
    await transporter.sendMail({
        from : process.env.EMAIL_USER ,
        to : toEmail ,
        subject : "Verify Your Email - E-Commerce" ,
        html : `
            <div style="font-family:Arial,sans-serif;padding:20px">
                <h2>Hello ${name} 👋</h2>

                <p>
                    Thank you for registering at <b>E-Commerce</b>.
                </p>

                <p>
                    Please click the button below to verify your email address.
                </p>

                <a
                    href="${verifyLink}"
                    style="
                        display:inline-block;
                        padding:12px 24px;
                        background:#f59e0b;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top:20px">
                    This link will expire in <b>24 hours</b>.
                </p>

                <p>
                    If you didn't create this account, simply ignore this email.
                </p>

                <hr>

                <small>E-Commerce Team</small>
            </div>
        `
    });
}