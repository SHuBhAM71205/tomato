import jwt from "jsonwebtoken"

const genToken=async (userid) => {
    try {
        const token=await jwt.sign({userid:userid.toString()},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error){
        console.log(error)
    }
}

export default genToken