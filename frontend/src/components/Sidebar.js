import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false); // state for controlling the sidebar visibility
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // state for storing the window width

  const showSidebar = () => setSidebar(!sidebar); // function that toggles sidebar visibility
  const location = useLocation(); // acess the current location
  const activeLink = location.pathname; // get the current active link

  const handleResize = () => {
    setWindowWidth(window.innerWidth); // update the window width when resized
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize); // event listener for window resize
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setSidebar(true); // sibar visible if width > 768px
    } else {
      setSidebar(false); // hide sidebar if width < 768px
    }
  }, [windowWidth]);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          {windowWidth <= 768 && ( 
            // render the menu icon if the window width is <= 768px
            <Link to='#' className='menu-bars1'>
              <MenuIcon onClick={showSidebar} /> {/**show the sidebar when you click on menu */}
            </Link>
          )}
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {windowWidth <= 768 && ( 
            // sidebar content rendering if window width <= 768px
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle' onClick={showSidebar}>
                <Link to='#' className='menu-bars2'>
                    <div className='close-icon'>
                    <CloseOutlinedIcon  />
                    </div>
                  
                </Link>
              </li>
              {SidebarData.map((val, key) => {
                return (
                  // render sidebar links based on sidebarData array
                  <li key={key} className={val.cName}>
                    <Link to={val.link} className={val.link === activeLink ? 'active': ''}>
                      {val.icon}
                      <span>{val.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {windowWidth > 768 && ( 
            // render sidebar content only if window width > 768px
            <ul className='nav-menu-items'>
              {SidebarData.map((val, key) => {
                return (
                  <li key={key} className={val.cName}>
                    <Link to={val.link} className={val.link === activeLink ? 'active' : ''}>
                      {val.icon}
                      <span>{val.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
