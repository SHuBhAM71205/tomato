import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import genToken from "../utils/token.utils.js";
import { sendOtp } from "../utils/mail.utils.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body;

        const temp_user = await User.findOne({ email });
        if (temp_user) {
            return res.status(400).json({ error: "Email already registered" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashPassword, mobile, role });

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials (email not found)" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials (wrong password)" });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
};
export const getOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.passresetOTP = otp;
        user.isOTPVerified = false;
        await sendOtp(email, otp);
        
        user.OTPexpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        user.save();
        
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error " });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.passresetOTP !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        if (user.OTPexpires < Date.now()) {
            return res.status(400).json({ error: "OTP expired" });
        }

        user.isOTPVerified = true;
        
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        return res.status(500).json({ error: "server error " });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.isOTPVerified) {
            return res.status(400).json({ error: "OTP not verified" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.passresetOTP = null;
        user.OTPexpires = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error " });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { email, fullName, mobile, role } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                fullName,
                mobile,
                role,
                password: null // No password for Google accounts
            });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
};
export const googleAuthLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            
            return res.status(404).json({ error: "User not found. Please sign up with Google first." });
        }

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });


        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
};

export const logout = async (req,res) =>{
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
}