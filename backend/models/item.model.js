import mongoose, { Mongoose } from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    catagory: {
      type: String,
      required: true,
      enum: [
        "Snacks",
        "Main Course",
        "Desserts",
        "Beverages",
        "Salads",
        "Soups",
        "Appetizers",
        "",
      ],
    },
    price: {
        type: Number,
        min:0,
        required: true,
    },
    foodGroup:{
        type: String,
        enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
        required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", ItemSchema);

export default Item