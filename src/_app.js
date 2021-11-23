import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext'

import { IsJoinedRedirect, IsLoggedInRedirect, IsRegisterRedirect, ProtectedRoute } from "./routes/Routes";

import HomePage from "./pages/home";
import ClassroomPage from "./pages/classroom";
import JoinPage from "./pages/join";

import { LoginForm, RegisterForm } from "./components/components";



function App() {
  return (
    <Router>
      <Switch>
        <IsLoggedInRedirect
          loggedInPath="/"
          path="/signin"
          exact
        >
          <LoginForm />
        </IsLoggedInRedirect>

        <IsRegisterRedirect
          registeredPath="/signin"
          path="/register"
          exact
        >
          <RegisterForm />
        </IsRegisterRedirect>

        <IsLoggedInRedirect
          loggedInPath="/classrooms/join"
          path="/classrooms/invitation/:id"
          exact
        >
          <LoginForm />
        </IsLoggedInRedirect>

        <IsJoinedRedirect joinedPath="/" path="/classrooms/join" exact>
          <JoinPage />
        </IsJoinedRedirect>

        <ProtectedRoute redirectPath="/signin" path="/" exact>
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute redirectPath="/signin" path="/classroom/:id" exact>
          <ClassroomPage />
        </ProtectedRoute>

        

        


      </Switch>
    </Router>
  );
}

export default App;
