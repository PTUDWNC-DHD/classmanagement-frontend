import { Fragment, useState } from "react";

import { Switch, SwipeableDrawer, List, Divider, ListSubheader, ListItemButton, ListItemIcon, ListItemText, IconButton} from "@mui/material";

import { Menu, HomeRounded, CalendarTodayRounded, ArchiveRounded, Settings } from "@mui/icons-material";

import { HeaderBar } from "../components";


export default function Header({check,change}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (value) => {
    setIsOpen(value)
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
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
          <Menu />
        </IconButton>
      </HeaderBar>
      <SwipeableDrawer open={isOpen} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
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
            <Switch 
            inputProps={{'aria-label':'checkbox with default color'}}
            onChange={change}
            checked={check}
            />
          </ListItemButton>
        </List>
      </SwipeableDrawer>
    </Fragment>
  );
}

