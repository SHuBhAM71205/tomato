import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connect_db from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRouter from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import ShopRoute from "./routes/shop.routes.js";
import ItemRoute from "./routes/item.routes.js";

const app=express();
const port=process.env.PORT || 5000;

app.use(cors({
    origin:process.env.FRONTEND_URL||"http://localhost:5173",
    credentials:true
}))

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRoute)
app.use("/api/shop",ShopRoute)
app.use("/api/item",ItemRoute)

app.listen(port,()=>{
    connect_db();
    console.log(`\nServer Started at ${port}\n`)
})

