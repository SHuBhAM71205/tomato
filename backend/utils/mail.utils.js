import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service:"Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {   
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});


export const sendOtp = async (email,otp) => {
    // complete it
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}