import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { 
  Switch, 
  SwipeableDrawer, 
  List, 
  ListItem, 
  Divider, 
  ListSubheader, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Typography
} from "@mui/material";
import { Menu, HomeRounded, Class } from "@mui/icons-material";

import HeaderBar from './HeaderBar';

import DisplayContext from "../../contexts/displayContext";
import AuthContext from "../../contexts/authContext";


const Header = () => {
  const { currentMode, setCurrentMode } = useContext(DisplayContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true)
  }

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
  }

  const handleChangeMode = () => {
    setCurrentMode(prevMode => {
      if (prevMode === "light")
        return "dark";
      else
        return "light"
    })
  }

  const openHomePage = () => {
    navigate('/')
  }

  const openClassroom = (id) => {
    navigate(`/classroom/${id}`)
  }


  const openSettings = () => {
    console.log('open settings page')
  }

  return (
    <Fragment>
      <HeaderBar>
        <IconButton sx={{ mx: 1}} onClick={handleOpenDrawer}>
          <Menu />
        </IconButton>
      </HeaderBar>
      <SwipeableDrawer 
        open={isOpenDrawer} 
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer} 
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          subheader={
            <ListSubheader>
              Navigation Menu
            </ListSubheader>
          }
        >
          <ListItemButton onClick={openHomePage}>
            <ListItemIcon>
              <HomeRounded />
            </ListItemIcon>
            <ListItemText primary="All classrooms" />
          </ListItemButton>

          {
            currentUser && currentUser?.classrooms?.map((classroom, index) => {
              return (
                <ListItemButton key={index} onClick={e => openClassroom(classroom._id)}>
                  <ListItemIcon>
                    <Class />
                  </ListItemIcon>
                  <ListItemText primary={classroom.name}/>
                </ListItemButton>
              )
            })
          }
          </List>
        <Divider />

        <List>
          <ListItem>
            <Typography variant="subtitle2">Main Theme</Typography>
          </ListItem>
          <ListItem>
            <Typography>Light</Typography>
            <Switch 
              checked={currentMode === "light" ? false: true}
              onChange={handleChangeMode} 
            />
            <Typography>Dark</Typography>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </Fragment>
  );
}

export default Header;