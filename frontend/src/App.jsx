import './App.css'
import {Route, Routes} from "react-router-dom"

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrUser from './hooks/useGetCurrUser'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import { use } from 'react'
import getCity from './hooks/useGetCity'

export const serverURL=import.meta.env.VITE_BACKEND;

function App() {
  useGetCurrUser()

  const userData = useSelector(state => state.user)

  return (
    <>
      <Routes>
        <Route path='/resetPass' element={<ForgotPassword/>}/>
        <Route  path='/signup' element={<SignUp/>} />
        <Route  path='/login' element={<SignIn/>} />
        {}
        <Route path='/' element={userData.userData ? <Home /> : <SignIn/>} />
      </Routes>
    </>
  )
}

export default App
