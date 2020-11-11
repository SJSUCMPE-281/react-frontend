import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



function MainHeader() {
 

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo'>
          SaaS Shoppe 
          <i class='fab fa-firstdraft' />
        </Link>
       
      </nav>
    </>
  );
}

export default MainHeader;
