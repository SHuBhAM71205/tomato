import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {IoIosArrowBack} from "react-icons/io"

const primaryColor = "#E17100";
const hoverColor = "#BB4D00";
const bgColor = "#f3f4f6";
const borderColor = "#d1d5db";

const backend=import.meta.env.VITE_BACKEND;
export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=Email, 2=OTP, 3=Reset Password
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        
        await axios.post(`${backend}/api/auth/send-otp`, { email: formData.email });
        setStep(2);
      } else if (step === 2) {

        await axios.post(`${backend}/api/auth/verify-otp`, { email: formData.email, otp });
        setStep(3);
      } else if (step === 3) {

        if (formData.password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        await axios.post(`${backend}/api/auth/reset-password`, {
          email: formData.email,
          newPassword: formData.password
        });
        alert("Password reset successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <IoIosArrowBack className='text-black fixed top-7 left-5' size={30} onClick={() => navigate('/login')} />
      <div className='min-h-screen flex items-center justify-center p-4 w-full' style={{ backgroundColor: bgColor }}>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]' style={{ borderColor: borderColor }}>
          <h1 className='font-bold text-amber-700 text-3xl flex justify-center'>Tomato</h1>
          <p className='mb-5 flex justify-center'>Reset Password</p>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
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
            )}

            {step === 2 && (
              <div className='mb-4'>
                <label htmlFor="otp" className='text-gray-700 font-medium mb-2 ml-3 block'>OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
                  placeholder='Enter OTP'
                />
              </div>
            )}

            {step === 3 && (
              <>
                <div className='mb-4'>
                  <label htmlFor="password" className='text-gray-700 font-medium mb-2 ml-3 block'>New Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
                    placeholder='Enter new password'
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor="confirmPassword" className='text-gray-700 font-medium mb-2 ml-3 block'>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-200'
                    placeholder='Confirm new password'
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200'
            >
              {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
