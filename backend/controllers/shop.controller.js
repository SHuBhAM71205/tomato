import  Shop  from "../models/shop.model.js";
import upload from "../utils/cloudinary.js";

export const createShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image = null;
    if (req.file) {
      image = await upload(req.file.path);
    }
    const owner = req.userId;

    const newShop = new Shop({
      name,
      image: image ? image.secure_url : null,
      city,
      state,
      address,
      owner
    });
    await newShop.save();
    newShop.populate('owner', '-password -email -role -__v -createdAt -updatedAt -resetToken -resetTokenExpiry -shops').execPopulate();
    res.status(201).json({ message: "Shop created successfully", shop: newShop });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
}


export const editShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        const shopId = req.params.id;


        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        shop.name = name || shop.name;
        shop.city = city || shop.city;
        shop.state = state || shop.state;
        shop.address = address || shop.address;

        if (req.file) {
            const image = await upload(req.file.path);
            shop.image = image ? image.secure_url : shop.image;
        }

        await shop.save();
        res.status(200).json({ message: "Shop updated successfully", shop });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getShop = async (req,res) => {
    try{
        const userId=req.userId;

        const shop= await Shop.find({owner:userId}).populate('owner', '-password -email -role -__v -createdAt -updatedAt -resetToken -resetTokenExpiry -shops');
        if(!shop){
            return res.status(404).json({ message: "Shop not found" });
        }
        res.status(200).json({ shop });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}