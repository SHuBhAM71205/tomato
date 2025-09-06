import React from "react";
import { FaLocationArrow, FaLocationDot } from "react-icons/fa6";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { useSelector } from "react-redux";

const primaryColor = "#E17100";
const hoverColor = "#BB4D00";
const bgColor = "#f3f4f6";
const borderColor = "#d1d5db";

function UserDeshboard() {
  return <Nav />;
}

function Nav() {
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
          <div className="h-[50px] w-full md:w-auto hidden md:flex bg-gray-200 rounded-2xl items-center">
            <IoIosSearch className="text-[30px] text-gray-400 m-3" />
            <input
              type="text"
              className="px-[10px] text-gray-700 outline-0 w-full"
              placeholder="Search here.."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IoIosSearch
            className="text-[30px] md:hidden text-gray-400 m-3"
            onClick={() => setSearchDropdown(!searchDropdown)}
          />
          <div className="h-[50px] flex items-center text-black relative">
            <IoIosCart className="text-[30px] text-[#ff4d2d] m-3" />
            <span className="text-[#ff4d2d] absolute top-0 right-2 text-xs">
              00
            </span>
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d] text-white text-sm font-medium hover:bg-[#913d01]">
              My Order
            </button>
          </div>

          <div
            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#ff4d2d]
                        text-white flex items-center justify-center bg-[#ff4d2d] text-2xl font-bold"
            onClick={() => setShowInfo(!showInfo)}
          >
            {userData?.fullName.slice(0, 1).toUpperCase()}
          </div>
        </div>
        {showInfo && <Popup userData={userData} />}
      </div>
      {searchDropdown && (
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
        <div className="text-[17px] font-semibold  hover:text-gray-800 text-[#ff4d2d] cursor-pointer">
          Logout
        </div>
      </div>
    </>
  );
}
export default UserDeshboard;
