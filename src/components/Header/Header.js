import { Fragment, useState, useContext } from "react";

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
import { Menu, HomeRounded, CalendarTodayRounded, ArchiveRounded, Settings } from "@mui/icons-material";

import HeaderBar from './HeaderBar';

import DisplayContext from "../../contexts/displayContext";


const Header = () => {
  const { currentMode, setCurrentMode } = useContext(DisplayContext)
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
    console.log('open home page')
  }

  const openCalendarPage = () => {
    console.log('open calendar page')
  }

  const openArchivePage = () => {
    console.log('open archive page')
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

          <ListItemButton onClick={openCalendarPage}>
            <ListItemIcon>
              <CalendarTodayRounded />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>

          <ListItemButton onClick={openArchivePage}>
            <ListItemIcon>
              <ArchiveRounded />
            </ListItemIcon>
            <ListItemText primary="Archive Classrooms" />
          </ListItemButton>
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={openSettings}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
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