import User from "../models/user.model.js";

export const getCurrUser=async (req,res) => {
    try{
        const userId=req.userId;
        console.log(userId)
        if(!userId)
        {
            return res.status(400).json({ error: "user id not found" });
        }
        const user=await User.findById(userId)
        if(!user)
        {
            return res.status(400).json({ error: "user  not found" });
        }
        return res.status(200).json(user);
    }
    catch(error)
    {   
        console.log(error)
        return res.status(500).json({ error: "server error" });
    }
}