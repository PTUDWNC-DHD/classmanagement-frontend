import { Fragment, useState } from "react";

import { SwipeableDrawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";

import { Menu, Inbox, Mail } from "@mui/icons-material";

import { HeaderBar } from "../components";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (value) => {
    setIsOpen(value)
  };

  return (
    <Fragment>
      <HeaderBar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
          <Menu />
        </IconButton>
      </HeaderBar>
      <SwipeableDrawer open={isOpen} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
        <div onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
}

export default Header