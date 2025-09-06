import express from "express"
import { getCurrUser } from "../controllers/user.controller.js";
import auth from "../middleware/Auth.middleware.js";

const userRoute=express.Router();

userRoute.get('/current-user',auth,getCurrUser)

export default userRoute