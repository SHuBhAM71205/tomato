import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice'

function useGetCurrUser() {
    const despatch=useDispatch();
    useEffect(()=>{
        const fetchUser=async () => {
            try {
                const res=await axios.get(`${serverURL}/api/user/current-user`,
                    {withCredentials:true}  
                )
                despatch(setUserData(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    },[])
}

export default useGetCurrUser