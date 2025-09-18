import React from 'react'
import Nav from './Nav'
import { GiTomato } from "react-icons/gi";
import { useSelector } from 'react-redux'

function OwnerDeshboard() {
  const {myShopData}=useSelector(state=> state.owner)
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>

      <Nav/>
        {!myShopData?(
          <div className='flex justify-center item-center p-4 sm:p-6'>
            <div className='w-full max-w-md shadow-lg rounded-2xl p-6 border bg-white border-gray-100 hover:shadow-xl transition-shadow duration-300'>
              <div className='flex flex-col items-center text-center'>
                <GiTomato size={30} className="text-[#FF6347]"/>
                <h1 className='text-lg font-semibold mt-3 text-black '>Want to start food delivery online?<br/>
                    Join Tomato...
                </h1>
                <p className='text-lg font-semibold mt-3 text-[#fa593d]'>Get Started by creating your shop online on tomato</p>
                <button className='bg-[#ff6347] w-full rounded-sm py-2 mt-3 hover:bg-[#ff6347d9] '>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
  )
}

export default OwnerDeshboard