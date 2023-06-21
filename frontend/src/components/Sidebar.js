import React, { useState } from 'react';
import '../css/Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconContext } from 'react-icons';

function Sidebar() {
    const [sidebar,setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
    <div className='navbar'>
        <Link to='#' className='menu-bars1'>
            <MenuIcon  onClick={showSidebar} />
        </Link>
    </div>

    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle' onClick={showSidebar}>
                <Link to='#' className='menu-bars2'>
                <CloseOutlinedIcon />
                </Link>
            </li>
            {SidebarData.map((val, key) => {
                return (
                    <li  key={key} className={val.cName}>  
                       <Link to={val.link}>
                        {val.icon}
                         <span>{val.title}</span>
                       </Link>
                    </li>
                );
            })}
        </ul>
    </nav>
    </IconContext.Provider>
    </>
  );
}

export default Sidebar;