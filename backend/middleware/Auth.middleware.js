import jwt from 'jsonwebtoken'

const auth=async (req,res,next)=>{
    try {
       const token=req.cookies.token;
       if(!token)
        {
            return res.status(400).json({"error":"unauthorized"})
        } 
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch (error) {
        return res.status(400).json({"error":"unauthorized"})
    }
}