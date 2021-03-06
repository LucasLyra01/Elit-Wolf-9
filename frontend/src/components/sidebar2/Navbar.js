import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { IconContext } from 'react-icons';


function Navbar() {
  const { pathname } = useLocation();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    {(pathname !== '/' && pathname !== '/cadastro') ?
      <IconContext.Provider value={{ color: '#000'}}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className={`${'btnNavigation'} ${pathname === item.path ? 'isActive' : ''}`}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                
              );
            })}
          </ul>
        </nav>

      </IconContext.Provider>
        
    : ''}
    </>
  );
}

export default Navbar;