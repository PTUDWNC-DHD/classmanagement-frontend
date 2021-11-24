import { useContext, useState } from "react";
import { Link } from "react-router-dom"

import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import { Add, Logout } from "@mui/icons-material";

import AuthContext from "../../../context/AuthContext";

import { CreateClass } from "../../components";

import { useStyles } from "./style";

const HeaderBar = ({ children }) => {
  const { 
    setIsLoggedIn,
    setCurrentUser,
    setCreateClassDialog
    } = useContext(AuthContext);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

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
            <Link to='/'>
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            </Link>
            <Typography className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add className={classes.icon} onClick={handleClick} />
            <Menu 
              keepMounted 
              id="simple-menu" 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Link to='/account'>
                <Avatar className={classes.icon} src={'./avatar.jpg'}/>
              </Link>
            </div>
            <Logout className={classes.icon} onClick={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
    </div>
  );
};

export default HeaderBar;
