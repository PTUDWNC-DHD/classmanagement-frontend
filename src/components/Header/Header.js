import React, { useContext } from "react";
import { Link } from "react-router-dom"

import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import { Add, Apps } from "@mui/icons-material";

import AuthContext from "../../context/AuthContext";

import { CreateClass } from "../components";

import { useStyles } from "./style";

const Header = ({ children }) => {
  const { 
    setIsLoggedIn,
    setCurrentUser,
    setCreateClassDialog,
    setJoinClassDialog, } = useContext(AuthContext);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    //setJoinClassDialog(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Apps className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Link exact to='/account'>
                <Avatar
                  src={'./avatar.jpg'}
                  className={classes.icon}
                />
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
    </div>
  );
};

export default Header;
