import express from "express"
import { login, logout, signup ,resetPassword,verifyOTP,getOTP, googleAuth, googleAuthLogin} from "../controllers/auth.controller.js"

const authRouter=express.Router()

authRouter.post("/signup",signup)

authRouter.get("/logout",logout)

authRouter.post("/login",login)

authRouter.post("/send-otp",getOTP)

authRouter.post("/verify-otp",verifyOTP)

authRouter.post("/reset-password",resetPassword)

authRouter.post("/google-auth",googleAuth)

authRouter.post("/google-auth-login",googleAuthLogin)


export default authRouter