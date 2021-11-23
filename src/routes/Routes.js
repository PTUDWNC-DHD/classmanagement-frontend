import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from '../context/AuthContext'

export function IsLoggedInRedirect({ loggedInPath, children, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);

  const url = window.location.href;
  const joinPath = '/join/';
  const joinPathIndex = url.indexOf(joinPath);
  let joinCode = '';
  if (joinPathIndex > 0){
    joinCode = url.slice(joinPathIndex + joinPath.length)
  }

  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) {
          return children;
        }
        if (isLoggedIn) {
          return <Redirect to={{ pathname: loggedInPath, joinCode: joinCode }} />;
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

export function IsJoinedRedirect({ joinedPath, children, ...rest }) {
  const { isJoined } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={() => {
        if (!isJoined) {
          return children;
        }
        if (isJoined) {
          return <Redirect to={{ pathname: joinedPath }} />;
        }
        return null;
      }}
    />
  );
}

export function ProtectedRoute({ children, redirectPath, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isLoggedIn) {
          return children;
        }
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
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
