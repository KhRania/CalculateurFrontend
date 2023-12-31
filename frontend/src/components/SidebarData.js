import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/Home",
    cName: 'nav-text',
    active: false  
  },
  {
    title: "Profile",
    icon: <PersonIcon />,
    link: "/Profile",
    cName: 'nav-text',
    active: false  
  },
  {
    title: "Log out",
    icon: <LogoutIcon />,
    link: "/",
    cName: 'nav-text',
    active: false  
  },
];
