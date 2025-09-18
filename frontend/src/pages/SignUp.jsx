import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/user.slice';

const primaryColor = "#E17100";
const hoverColor = "#BB4D00";
const bgColor = "#f3f4f6";
const borderColor = "#d1d5db";

const backend=import.meta.env.VITE_BACKEND;

export default function SignUp() {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const roles = ["user", "owner", "deliveryBoy"];
  const despatch=useDispatch();
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
      const res=await axios.post(`${backend}/api/auth/signup`,{...formData,role},{withCredentials:true})
      despatch(setUserData(res.data))
      window.alert("Account created successfully redirect to the login page")
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
  };
  const handleGoogleAuth=async ()=>{

    if(formData.mobile==null || formData.mobile===""){ 
      alert("pls enter mobile number for using oAuth")
      return;
    }

    const provider=new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');
    const result=await signInWithPopup(auth,provider)
    console.log({
      mobile: formData.mobile,
      email: result.user.email,
      fullName: result.user.displayName,
      role
    })
    const res=await axios.post(`${backend}/api/auth/google-auth`,
      {
        mobile:formData.mobile,
        email:result.user.email,
        fullName:result.user.displayName,
        role
      },
      {withCredentials:true}
    )
    despatch(setUserData(res.data))
    window.alert("Account created successfully redirect to the login page")
    navigate("/login");
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-4 w-full' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>

        {/* Title */}
        <h1 className='font-bold text-amber-700 text-3xl flex justify-center'>
          Tomato
        </h1>
        <p className='mb-5 flex justify-center'>Create Your Account</p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className='mb-4'>
            <label htmlFor="fullName" className='text-gray-700 font-medium mb-2 ml-3 block'>Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
              placeholder='Enter your full name'
            />
          </div>

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

          {/* Phone Number */}
          <div className='mb-4'>
            <label htmlFor="mobile" className='text-gray-700 font-medium mb-2 ml-3 block'>Phone Number</label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
              placeholder='Enter your mobile number'
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
            Sign Up
          </button>
        </form>

        <span className='flex justify-center pt-2'>OR</span>
        <div className='w-full border-t-2 my-2'></div>

        {/* Google Login */}
        <div className='flex gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 cursor-pointer rounded-lg transition duration-200'
          onClick={()=>{handleGoogleAuth()}}>
          <FcGoogle size={25} />
          <p>Continue with Google</p>
        </div>

        {/* Login Link */}
        <p className='text-center mt-4 text-sm text-gray-600'>
          Already have an account?
          <span
            className='text-amber-600 font-medium hover:underline ml-1 cursor-pointer'
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>

      </div>
    </div>
  );
}


