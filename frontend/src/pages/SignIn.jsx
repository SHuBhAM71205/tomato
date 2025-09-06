import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/user.slice';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
const primaryColor = "#E17100";
const hoverColor = "#BB4D00";
const bgColor = "#f3f4f6";
const borderColor = "#d1d5db";

const backend=import.meta.env.VITE_BACKEND;

export default function SignIn() {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const roles = ["user", "owner", "deliveryBoy"];

  const dispatch=useDispatch();
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Empty submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData,role });
    
    try {
        const res=await axios.post(`${backend}/api/auth/login`,{...formData,role},{withCredentials:true}
        )

        dispatch(setUserData(res.data))
        navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  const handleGoogleLogin = async () => {
    const provider=new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
    const result=await signInWithPopup(auth,provider)
    try {
      const res = await axios.post(`${backend}/api/auth/google-auth-login`, { email: result.user.email, fullName: result.user.displayName, mobile: result.user.phoneNumber, role: "user" },{ withCredentials: true });

      dispatch(setUserData(res.data))
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 w-full' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>

        {/* Title */}
        <h1 className='font-bold text-amber-700 text-3xl flex justify-center'>
          Tomato
        </h1>
        <p className='mb-5 flex justify-center'>Login</p>

        <form onSubmit={handleSubmit}>
       
          {/* Email */}
          <div className='mb-4'>
            <label htmlFor="email" className='text-gray-700 font-medium mb-2 ml-3 block'>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
              placeholder='Enter your email'
            />
          </div>

          {/* Password */}
          <div className='mb-6'>
            <label htmlFor="password" className='text-gray-700 font-medium mb-2 ml-3 block'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
                placeholder='Enter your password'
              />
              <button
                type="button"
                className='absolute right-3 top-3'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Roles */}
          <div className='flex gap-2 flex-wrap'>
            {roles.map((rle) => (
              <div
                key={rle}
                style={role === rle ? { backgroundColor: primaryColor, color: "#fff" } : {}}
                className='flex-1 border rounded-lg px-3 py-2 mb-6 text-center font-medium cursor-pointer transition-colors'
                onClick={() => {setRole(rle)}}
              >
                {rle.toLowerCase()}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200'
          >
            Login
          </button>
        </form>

        <span className='flex justify-center pt-2'>OR</span>
        <div className='w-full border-t-2 my-2'></div>

        {/* Google Login */}
        <div className='flex gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 cursor-pointer rounded-lg transition duration-200'
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={25} />
          <p>Login with Google</p>
        </div>

        {/* Login Link */}
        <p className='text-center mt-4 text-sm text-gray-600'>
          Forgot Password ?
          <span
            className='text-amber-600 font-medium hover:underline ml-1 cursor-pointer'
            onClick={() => navigate("/resetPass")}
          >
            Reset 
          </span>
        </p>

      </div>
    </div>
  );
}
