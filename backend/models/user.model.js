import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String //due to the o auth not necessary require//
    },
    mobile:{
        type:String,
        require:true, 
    },
    role:{
        type:String,
        required:true,
        enum:["user","owner","deliveryBoy"]
    },
    passresetOTP:{
        type:String,
    },
    isOTPVerified:{
        type:Boolean,
        default:false
    },
    OTPexpires:{
        type:Date,
        
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)

export default User;