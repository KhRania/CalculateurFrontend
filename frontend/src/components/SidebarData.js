import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'

export const SidebarData = [
    {
        title: "My Projects",
        icon: <HomeIcon />,
        link: "/Myprojects"
    },
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/Profile"
    },
    {
        title: "Log out",
        icon: <LogoutIcon />,
        link: "/"
    },
]