import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext'

import { IsLoggedInRedirect, IsRegisterRedirect, ProtectedRoute } from "./routes/Routes";

import HomePage from "./pages/home";
import ClassroomPage from "./pages/classroom";

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

        <ProtectedRoute path="/" exact>
          <HomePage />
        </ProtectedRoute>

        <ProtectedRoute path="/classroom/:id" exact>
          <ClassroomPage />
        </ProtectedRoute>

        
      </Switch>
    </Router>
  );
}

export default App;
