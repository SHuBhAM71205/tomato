import React from 'react'

import { FaLocationArrow, FaLocationDot } from "react-icons/fa6";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setUserData } from "../redux/user.slice.js";
import axios from "axios"
import { FaPlus } from 'react-icons/fa';

export default function Nav({role}) {
  const userData = useSelector((state) => state.user.userData);

  const [showInfo, setShowInfo] = React.useState(false);
  const [searchDropdown, setSearchDropdown] = React.useState(false);
  const city = useSelector((state) => state.user.city);
  return (
    <>
      <div className="w-full flex min-h-17  md:flex-row items-center justify-between md:justify-center gap-[10px] md:gap-[30px] px-[20px] fixed top-0 z-[9999] bg-white overflow-visible">
        <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Tomato</h1>

        <div className="w-full md:w-[60%] lg:w-[40%] h-[70px] hidden bg-white shadow-xl rounded-lg items-center gap-[20px] md:flex px-3 justify-between border-gray-300">
          <div className="h-full flex items-center text-black ">
            <FaLocationDot className="text-[30px] text-[#ff4d2d] m-3" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          {userData.role=="user" && <div className="h-[50px] w-full md:w-auto hidden md:flex bg-gray-200 rounded-2xl items-center">
            <IoIosSearch className="text-[30px] text-gray-400 m-3" />
            <input
              type="text"
              className="px-[10px] text-gray-700 outline-0 w-full"
              placeholder="Search here.."
            />
          </div>}
        </div>

        <div className="flex items-center gap-2">
          {userData.role=="user" && <IoIosSearch
            className="text-[30px] md:hidden text-gray-400 m-3 cursor-pointer"
            onClick={() => setSearchDropdown(!searchDropdown)}
          />}
          <div className="h-[50px] flex items-center text-black relative">
            {userData.role=="user" &&<> <IoIosCart className="text-[30px] text-[#ff4d2d] m-3" />
            <span className="text-[#ff4d2d] absolute top-0 right-2 text-xs">
            </span></>}
            {
                userData.role=="owner" && <FaPlus className="text-[25px] text-white m-3 bg-[#ff4d2d] rounded-full p-1 cursor-pointer"/>
            }
            <button className={`${userData.role=="user"?"hidden":""} md:block px-3 py-1 rounded-lg bg-[#ff4d2d] text-white text-sm font-medium hover:bg-[#ff4d2d]/70`}>
              {userData.role=="user" ? "My Order" : "Current Order"}
            </button>
          </div>

          <div
            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#ff4d2d]
                        text-white flex items-center justify-center bg-[#ff4d2d] text-2xl font-bold cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          >
            {userData?.fullName.slice(0, 1).toUpperCase()}
          </div>
        </div>
        {showInfo && <Popup userData={userData} />}
      </div>
      {userData.role=="user" && searchDropdown && (
        <div className="w-[80%] md:w-[60%] lg:w-[40%] h-[40px] flex bg-white shadow-xl rounded-lg items-center gap-[10px] md:hidden px-3 justify-between border-gray-300 ">
          <input
            type="text"
            className="px-[10px] text-gray-700 outline-0 w-full"
            placeholder="Search here.."
          />
        </div>
      )}
    </>
  );
}

function Popup({ userData }) {
  const dispatch=useDispatch();
  const handleLogout = async ()=> {
    try {
      const res=await axios.get(`${import.meta.env.VITE_BACKEND}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      dispatch(setCity(null))
      useNavigate("/")
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white rounded-lg shadow-2xl p-[20px] flex flex-col gap-[10px] z-[100000]">
        <div className="text-[17px] font-semibold text-gray-700">
          {userData?.fullName}
        </div>
        <div className="text-[17px] font-semibold block md:hidden text-gray-700">
          {" "}
          My Orders
        </div>
        <div className="text-[17px] font-semibold  hover:text-gray-800 text-[#ff4d2d] cursor-pointer"
            onClick={()=>handleLogout()}
          >
          Logout
        </div>
      </div>
    </>
  );
}

