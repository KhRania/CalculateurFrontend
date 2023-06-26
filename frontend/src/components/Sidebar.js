import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar);
  const location = useLocation();
  const activeLink = location.pathname;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setSidebar(true); 
    } else {
      setSidebar(false); 
    }
  }, [windowWidth]);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          {windowWidth <= 768 && ( 
            <Link to='#' className='menu-bars1'>
              <MenuIcon onClick={showSidebar} />
            </Link>
          )}
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {windowWidth <= 768 && ( 
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
