import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext'

import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";

import { Drawer, JoinedClasses, LoginForm, Main, RegisterForm } from "./components/components";



function App() {
  // const { loggedInMail } = useLocalContext();

  // const [createdClasses, setCreatedClasses] = useState([]);
  // const [joinedClasses, setJoinedClasses] = useState([]);

  // useEffect(() => {
  //   if (loggedInMail) {
  //     // let unsubscribe = db
  //     //   .collection("CreatedClasses")
  //     //   .doc(loggedInMail)
  //     //   .collection("classes")
  //     //   .onSnapshot((snapshot) => {
  //     //     setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
  //     //   });
  //     // return () => unsubscribe();
  //   }
  // }, [loggedInMail]);

  // useEffect(() => {
  //   if (loggedInMail) {
  //     // let unsubscribe = db
  //     //   .collection("JoinedClasses")
  //     //   .doc(loggedInMail)
  //     //   .collection("classes")
  //     //   .onSnapshot((snapshot) => {
  //     //     setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
  //     //   });

  //     // return () => unsubscribe();
  //   }
  // }, [loggedInMail]);
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          loggedInPath="/"
          path="/signin"
          exact
        >
          <LoginForm />
        </IsUserRedirect>

        <ProtectedRoute path="/" exact>
          <div>This is home page</div>
        </ProtectedRoute>
        <Route path="/register" exact>
          <RegisterForm />
        </Route>
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
        

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {createdClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}

            {joinedClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
        </ProtectedRoute> */}
      </Switch>
    </Router>
  );
}

export default App;
