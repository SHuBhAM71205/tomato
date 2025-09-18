import upload  from "../utils/cloudinary.js";
import  Shop  from "../models/shop.model.js";
import Item from "../models/item.model.js";

export const addItem = async (req,res) => {
    try {
        const {name,catagory,foodtype,price} = req.body;
        let image = null;
        if (req.file) {
           image = await upload(req.file.path);

        }

        const shopId = req.params.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return res.status(404).json({message:"Shop not found"})
        }
        const newItem = new Item({
            name,
            image: image ? image.secure_url : null,
            shop: shopId,
            catagory,
            foodGroup:foodtype,
            price
        });
        
        await newItem.save();
        shop.items.push(newItem._id);
        await shop.save();

        return res.status(201).json({message:"Item added successfully", item:newItem})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const editItem = async (req,res) => {
    try {
        const itemId = req.params.id;
        const {name,catagory,foodtype,price} = req.body;
        let image = null;
        if (req.file) {
           image = await upload(req.file.path);
        }
        const item = await Item.findById(itemId);
        if(!item){
            return res.status(404).json({message:"Item not found"})
        }
        item.name = name || item.name;
        item.image = image ? image.secure_url : item.image;
        item.catagory = catagory || item.catagory;
        item.foodGroup = foodtype || item.foodGroup;
        item.price = price || item.price;
        await item.save();

        return res.status(200).json({message:"Item updated successfully", item})
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}
