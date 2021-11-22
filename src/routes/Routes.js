import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from '../context/AuthContext'

export function IsLoggedInRedirect({ loggedInPath, children, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) {
          return children;
        }
        if (isLoggedIn) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }
        return null;
      }}
    />
  );
}

export function IsRegisterRedirect({ registeredPath, children, ...rest }) {
  const { isRegistered } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={() => {
        if (!isRegistered) {
          return children;
        }
        if (isRegistered) {
          return <Redirect to={{ pathname: registeredPath }} />;
        }
        return null;
      }}
    />
  );
}

export function ProtectedRoute({ children, component, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isLoggedIn) {
          if (component){
            return component
          }
          return children;
        }
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "signin",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
