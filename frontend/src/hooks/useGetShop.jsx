import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setShopData } from '../redux/owner.slice.js'

function useGetMyShop() {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchShop=async () => {
            try {
                const res=await axios.get(`${serverURL}/api/shop/getShop`,
                    {withCredentials:true}  
                )
                console.log(res.data)
                dispatch(setShopData(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchShop();
    },[])
}

export default useGetMyShop