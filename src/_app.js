import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext'

import { IsJoinedRedirect, IsLoggedInRedirect, IsRegisterRedirect, ProtectedRoute } from "./routes/Routes";

import HomePage from "./pages/home";
import ClassroomPage from "./pages/classroom";
import JoinPage from "./pages/join";
import AccountPage from "./pages/account";

import { LoginForm, RegisterForm } from "./components/components";



function App() {
  return (
    <Router>
      <Switch>
        <IsLoggedInRedirect
          exact path="/signin"
          loggedInPath="/"
        >
          <LoginForm />
        </IsLoggedInRedirect>

        <IsRegisterRedirect
          exact path="/register"
          registeredPath="/signin"
        >
          <RegisterForm />
        </IsRegisterRedirect>

        <IsLoggedInRedirect
          exact path="/classrooms/invitation/:id"
          loggedInPath="/classrooms/join"
        >
          <LoginForm />
        </IsLoggedInRedirect>

        <IsJoinedRedirect exact path="/classrooms/join" joinedPath="/">
          <JoinPage />
        </IsJoinedRedirect>

        <ProtectedRoute exact path="/" redirectPath="/signin">
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/classroom/:id" redirectPath="/signin">
          <ClassroomPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/account" redirectPath="/signin">
          <AccountPage />
        </ProtectedRoute>

      </Switch>
    </Router>
  );
}

export default App;
