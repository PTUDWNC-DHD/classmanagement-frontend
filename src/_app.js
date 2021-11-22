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

        <ProtectedRoute path="classroom/:id" exact component={ClassroomPage}>
        </ProtectedRoute>

        
        {/* {createdClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        {joinedClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        

         */}
      </Switch>
    </Router>
  );
}

export default App;
