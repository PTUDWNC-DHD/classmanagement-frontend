import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NonAuthRequired, AuthRequired } from "./authRoute";

import HomePage from '../pages/HomePage'
import ClassroomPage from '../pages/ClassroomPage'
import JoinPage from '../pages/JoinPage'
import AccountPage from '../pages/AccountPage'
import UserPage from "../pages/UserPage"
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import VerifyAccountPage from '../pages/VerifyAccountPage'
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import StudentGradePage from "../pages/StudentGradePage"




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

        <Route path='/verify/:email' element={
          <NonAuthRequired>
            <VerifyAccountPage/>
          </NonAuthRequired>
        }/>

        <Route path='/forgot' element={
          <NonAuthRequired>
            <ForgotPasswordPage/>
          </NonAuthRequired>
        }/>

        <Route path='/reset/:email' element={
          <NonAuthRequired>
            <ResetPasswordPage/>
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

        <Route path='/users/:id' element={
          <AuthRequired>
            <UserPage />
          </AuthRequired>
        }/>

        <Route path='/students/:classroomId/:studentId' element={
          <AuthRequired>
            <StudentGradePage />
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