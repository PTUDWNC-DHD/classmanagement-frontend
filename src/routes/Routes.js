import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthContext from '../context/AuthContext'

export function IsLoggedInRedirect({ loggedInPath, children, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);

  const url = window.location.href;
  const joinPath = '/classrooms/invitation/'
  const joinPathIndex = url.indexOf(joinPath);

  let joinCode = '';
  if (joinPathIndex > 0){
    joinCode = url.slice(joinPathIndex + joinPath.length)    
  }
  console.log('joinCode: ',joinCode);

  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) {
          return children;
        }
        else {
          return <Redirect to={{ pathname: loggedInPath, joinCode: joinCode }} />;
        }
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
        else {
          return <Redirect to={{ pathname: registeredPath }} />;
        }
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
        else {
          return <Redirect to={{ pathname: joinedPath }} />;
        }
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
        else {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
