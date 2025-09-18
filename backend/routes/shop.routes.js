import express from "express";
import auth from "../middleware/Auth.middleware.js";
import { createShop, editShop, getShop } from "../controllers/shop.controller.js";
import uploadMulter from "../middleware/multer.js";

const ShopRoute=express.Router();


ShopRoute.post("/addItem/:shopId",auth,uploadMulter.single("image"), createShop);
ShopRoute.put("/edit/:id", auth,uploadMulter.single("image"), editShop);
ShopRoute.get("/getShop",auth,getShop);


export default ShopRoute;