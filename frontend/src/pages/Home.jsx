import React from "react";
import { useSelector } from "react-redux";
import UserDeshboard from "../components/UserDeshboard";
import DiliveryBoyDeshboard from "../components/DiliveryBoyDeshboard";
import OwnerDeshboard from "../components/OwnerDeshboard";
import getCity from "../hooks/useGetCity";

const primaryColor = "#E17100";
const hoverColor = "#BB4D00";
const bgColor = "#f3f4f6";
const borderColor = "#d1d5db";

function Home() {
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  getCity();
  return (
    <div
      className={`w-full min-h-[100vh] pt-[100px] flex flex-col items-center`}
      style={{
        color: bgColor,
        borderColor: borderColor,
        backgroundColor: bgColor,
      }}
    >
      {userData.role === "user" ? (
        <UserDeshboard />
      ) : userData.role === "deliveryBoy" ? (
        <DiliveryBoyDeshboard />
      ) : (
        <OwnerDeshboard />
      )}
    </div>
  );
}

export default Home;
