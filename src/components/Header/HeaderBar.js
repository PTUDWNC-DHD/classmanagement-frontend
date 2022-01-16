import { useContext, useState } from "react";

import { Box, IconButton, Badge, AppBar, Avatar, Menu, MenuItem, Toolbar, Link, Typography } from "@mui/material";
import { Add, Logout, Notifications } from "@mui/icons-material";

import { CreateClass } from "../components";

import AuthContext from "../../contexts/authContext";
import { removeFromLocalStorage } from "../../utils/localStorage";
import * as Constant from '../../utils/constant'

//import "./style.css";


const HeaderBar = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [isOpenAddMenu, setIsOpenAddMenu] = useState(false); 

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);

  const [isOpenNoti, setIsOpenNoti] = useState(false);

  


  //handle button functions
  const handleAddButtonClick = () => {
    setIsOpenAddMenu(true);
  }

  const handleCloseAddMenu = () => {
    setIsOpenAddMenu(false);
  }

  const handleCreateButtonClick = () => {
    handleCloseAddMenu();
    setIsOpenCreateDialog(true);
  };

  const handleJoinButtonClick = () => {
    handleCloseAddMenu();
    setIsOpenJoinDialog(true);
  };

  const handleNotiButtonClick = () => {
    setIsOpenNoti(true);
  }

  const handleCloseNotiMenu = () => {
    setIsOpenNoti(false);
  }

  const handleLogoutButtonClick = () => {
    setCurrentUser(null)
    removeFromLocalStorage(Constant.LOCAL_STORAGE_USER)
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="common" position="static">
        <Toolbar >
          {/* Menu button  */}
          { children }

          <Link href='/' underline="none">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DHD Classroom
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box >
            {/* Add button */}
            <IconButton sx={{ mr: 1}} onClick={handleAddButtonClick}>
              <Add/>
            </IconButton>
            {/* Add menu */}
            <Menu
              open={isOpenAddMenu} 
              onClose={handleCloseAddMenu}
            >
              <MenuItem onClick={handleJoinButtonClick}>Join Class</MenuItem>
              <MenuItem onClick={handleCreateButtonClick}>Create Class</MenuItem>
            </Menu>
            {/* Notification button */}
            <IconButton
              sx={{ mr: 1}}
              aria-label="show new notifications"
              color="inherit"
              onClick={handleNotiButtonClick}
            >
              <Badge badgeContent={17} color="success">
                <Notifications size="large" />
              </Badge>
            </IconButton>
            {/* Notification menu */}
            <Menu
              open={isOpenNoti} 
              onClose={handleCloseNotiMenu}
            >
              <MenuItem >17 new notifications</MenuItem>
              
            </Menu>
            {/* Account button */}
            <IconButton sx={{ mr: 1}}>
              <Link href='/account' underline="none">
                <Avatar >
                  {currentUser && currentUser.user.name.charAt(0)}
                </Avatar>
              </Link>
            </IconButton>
            {/* Logout button */}
            <IconButton sx={{ mr: 1}} onClick={handleLogoutButtonClick}>
              <Logout  />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CreateClass isOpen={isOpenCreateDialog} setIsOpen={setIsOpenCreateDialog} />
    </Box>
  );
};

export default HeaderBar;
