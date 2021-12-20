import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NonAuthRequired, AuthRequired } from "./authRoute";

import HomePage from '../pages/HomePage'
import ClassroomPage from '../pages/ClassroomPage'
import JoinPage from '../pages/JoinPage'
import AccountPage from '../pages/AccountPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'




const AppRouter = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
          <NonAuthRequired>
            <LoginPage/>
          </NonAuthRequired>
        }/>

        <Route path='/register' element={
          <NonAuthRequired>
            <RegisterPage/>
          </NonAuthRequired>
        }/>

        <Route path={process.env.REACT_APP_INVITE_LINK + ':id/:type'} element={
          <AuthRequired>
            <JoinPage />
          </AuthRequired>
        }/>

        <Route path='/' element={
          <AuthRequired>
            <HomePage />
          </AuthRequired>
        }/>

        <Route path='/classroom/:id' element={
          <AuthRequired>
            <ClassroomPage />
          </AuthRequired>
        }/>

        <Route path='/account' element={
          <AuthRequired>
            <AccountPage />
          </AuthRequired>
        }/>

        <Route path="*" element={
          <AuthRequired>
            <HomePage />
          </AuthRequired>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;