import { Avatar, IconButton, Stack} from '@mui/material';

import { MenuRounded, NotificationsNoneRounded } from '@mui/icons-material';




const Header = (props) => {
  const logo = {
    img: '/tempLogo.svg',
    title: 'Temp Logo'
  }
  const avatar = {
    img: '/avatar.jpg',
    title: 'Temp Avatar'
  }

  return(
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <IconButton color="primary">
            <MenuRounded/>
          </IconButton>
          <img
              src={`${logo.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${logo.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={logo.title}
              loading="lazy"
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <IconButton color="primary">
            <NotificationsNoneRounded/>
          </IconButton>
          <IconButton>
            <Avatar 
              alt={avatar.title}
              src={avatar.img} 
            />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  )
}

export default Header;