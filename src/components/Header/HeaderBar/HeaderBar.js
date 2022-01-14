import { useContext, useState } from "react";
import { Link } from "react-router-dom"

import { Box, IconButton, Badge, AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Add, Logout, Notifications } from "@mui/icons-material";

import { CreateClass } from "../../components";

import AuthContext from "../../../contexts/authContext";
import { removeFromLocalStorage } from "../../../utils/localStorage";
import * as Constant from '../../../utils/constant'

import "./style.css";


const HeaderBar = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);

  const [notifi, setNotifi] = useState(null);

  const handleClickNoti = (event) => setNotifi(event.currentTarget);
  const handleCloseNoti = () => setNotifi(null);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="appbar" color="common" position="static">
        <Toolbar className="toolBar" >
          {children}
          <Link to='/'>
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
              className="img"
            />
          </Link>
          <Typography className="title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Classroom
          </Typography>
          <IconButton onClick={handleClick}>
            <Add className="icon" size="large" />
          </IconButton>
          <Menu 
            size="large"
            keepMounted 
            id="simple-menu" 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
          >
            <MenuItem onClick={handleJoin}>Join Class</MenuItem>
            <MenuItem onClick={handleCreate}>Create Class</MenuItem>
          </Menu>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleClickNoti}
          >
            <Badge badgeContent={17} color="error">
              <Notifications className="icon" size="large" />
            </Badge>
          </IconButton>
          <Menu 
            size="large"
            keepMounted 
            id="simple-menu" 
            notifi={notifi} 
            open={Boolean(notifi)} 
            onClose={handleCloseNoti}
          >
            <MenuItem >17 new notifications</MenuItem>
            
          </Menu>
            
          <IconButton>
            <Link to='/account' className="link">
              <Avatar className="icon" >
                {currentUser.user.name.charAt(0)}
              </Avatar>
            </Link>
            </IconButton>
          <Logout className="icon" onClick={handleLogout} />
            
        </Toolbar>
      </AppBar>
      <CreateClass isOpen={isOpenCreateDialog} setIsOpen={setIsOpenCreateDialog} />
    </Box>
  );
};

export default HeaderBar;
