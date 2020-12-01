import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarLogin.css';

function NavbarLogin(props) {
  console.log(props.user);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          SaaS Shoppe 
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/customer' className='nav-links' 
            style={{ backgroundColor: props.user==="CustomerGroup" ? 'blue' : '#1A171B' }}
            onClick={closeMobileMenu}>
              I am a Customer
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/seller'
              className='nav-links'
              style={{ backgroundColor: props.user==="SellerGroup" ? 'blue' : '#1A171B' }}
              onClick={closeMobileMenu}
            >
              I am a Seller
            </Link>
          </li>
        </ul> 
      </nav>
    </>
  );
}

export default NavbarLogin;
