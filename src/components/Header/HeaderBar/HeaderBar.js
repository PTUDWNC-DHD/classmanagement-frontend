import { useContext, useState } from "react";
import { Link } from "react-router-dom"

import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Add, Logout } from "@mui/icons-material";

import AuthContext from "../../../contexts/authContext";
import { CreateClass } from "../../components";
import { removeFromLocalStorage } from "../../../utils/localStorage";
import * as Constant from '../../../utils/constant'

import { useStyles } from "./style";

const HeaderBar = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCreate = () => {
    handleClose();
    setIsOpenCreateDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    //setIsOpenJoinDialog(true);
  };

  const handleLogout = () => {
    setCurrentUser(null)
    removeFromLocalStorage(Constant.LOCAL_STORAGE_USER)
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
                <Avatar className={classes.icon}>
                  {currentUser.user.name.charAt(0)}
                </Avatar>
              </Link>
            </div>
            <Logout className={classes.icon} onClick={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass isOpen={isOpenCreateDialog} setIsOpen={setIsOpenCreateDialog} />
    </div>
  );
};

export default HeaderBar;
