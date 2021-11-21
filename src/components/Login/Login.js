import React from "react";

import { useLocalContext } from "../../context/context";

import { Button } from "@mui/material";

import "./style.css";

import logo from "../../assets/logo.png";


const Login = () => {
  const { login, loggedInUser } = useLocalContext();

  console.log(loggedInUser);
  return (
    <div className="login">
      <img className="login__logo" src={logo} alt="Classroom" />

      <Button variant="contained" color="primary" onClick={() => login()}>
        Login Now!
      </Button>
    </div>
  );
};

export default Login;
