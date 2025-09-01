import './App.css'
import {Route, Routes} from "react-router-dom"

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
function App() {

  return (
    <>
      <Routes>
        <Route path='/resetPass' element={<ForgotPassword/>}/>
        <Route  path='/signup' element={<SignUp/>} />
        <Route  path='/login' element={<SignIn/>} />
      </Routes>
    </>
  )
}

export default App
