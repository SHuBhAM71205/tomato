import './App.css'
import {Route, Routes} from "react-router-dom"
import { useSelector } from 'react-redux'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrUser from './hooks/useGetCurrUser'
import useGetMyShop from './hooks/useGetShop'

import Home from './pages/Home'
import CreateEditPage from './pages/CreateEditPage'
import { Navigate } from 'react-router-dom'

export const serverURL=import.meta.env.VITE_BACKEND;

function App() {
  useGetCurrUser()
  useGetMyShop();
  const userData = useSelector(state => state.user)
  console.log(userData)
  return (
    <>
      <Routes>
        <Route path='/resetPass' element={<ForgotPassword/>}/>
        <Route  path='/signup' element={<SignUp/>} />
        <Route  path='/login' element={<SignIn/>} />
        {}
        <Route path='/' element={userData.userData ? <Home /> : <SignIn/>} />
        <Route path="/createShop" element={userData?.userData?.role==="owner" ? <CreateEditPage/> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
