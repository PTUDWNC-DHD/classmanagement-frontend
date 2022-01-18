import { useContext, useState, useEffect } from "react";

import { Box, IconButton, Badge, AppBar, Avatar, Menu, MenuItem, Toolbar, Link, Typography } from "@mui/material";
import { Add, Logout, Notifications } from "@mui/icons-material";

import { CreateClass, JoinClassByCode } from "../components";

import AuthContext from "../../contexts/authContext";
import { removeFromLocalStorage } from "../../utils/localStorage";
import * as Constant from '../../utils/constant'



const HeaderBar = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);

  const [addMenuAnchor, setAddMenuAnchor] = useState(null); 
  const [notiMenuAnchor, setNotiMenuAnchor] = useState(null);

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);

  useEffect(()=>{
    const newNotifications = []
    for (const noti in currentUser.user.notifications) {
      if (currentUser.user.notifications[noti].isNew)
        newNotifications.push(currentUser.user.notifications[noti]);
    }
    setNotifications(newNotifications);    
  },[currentUser])



  //handle button functions
  const handleAddButtonClick = (event) => {
    setAddMenuAnchor(event.currentTarget);
  }

  const handleCloseAddMenu = () => {
    setAddMenuAnchor(null);
  }

  const handleCreateButtonClick = () => {
    handleCloseAddMenu();
    setIsOpenCreateDialog(true);
  };

  const handleJoinButtonClick = () => {
    handleCloseAddMenu();
    setIsOpenJoinDialog(true);
  };

  const handleNotiButtonClick = (event) => {
    setNotiMenuAnchor(event.currentTarget);
  }

  const handleCloseNotiMenu = () => {
    setNotiMenuAnchor(null);
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
              anchorEl={addMenuAnchor}
              open={Boolean(addMenuAnchor)} 
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
              <Badge badgeContent={notifications.length} color="success">
                <Notifications size="large" />
              </Badge>
            </IconButton>
            {/* Notification menu */}
            <Menu
              anchorEl={notiMenuAnchor}
              open={Boolean(notiMenuAnchor)} 
              onClose={handleCloseNotiMenu}
            >
              {
                notifications.length > 0 ? (
                  notifications.map((noti, index) => (
                    <MenuItem key={index}>{noti.message}</MenuItem>
                  ))
                ) : (
                  <MenuItem>No notifcation</MenuItem>
                )
              }
              
              
            </Menu>
            {/* Account button */}
            <IconButton sx={{ mr: 1}}>
              <Link href={`/account`} underline="none">
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
      <JoinClassByCode studentId={currentUser.user.studentId} isOpen={isOpenJoinDialog} setIsOpen={setIsOpenJoinDialog} />
    </Box>
  );
};

export default HeaderBar;
