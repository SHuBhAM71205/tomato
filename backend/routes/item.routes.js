import express from "express";
import auth from "../middleware/Auth.middleware.js";
import { addItem,editItem } from "../controllers/item.controller.js";
import uploadMulter from "../middleware/multer.js";
const ItemRoute=express.Router();

ItemRoute.post("/add",auth,uploadMulter.single("image"), addItem);
ItemRoute.put("/edit/:id", auth,uploadMulter.single("image"), editItem);


export default ItemRoute;