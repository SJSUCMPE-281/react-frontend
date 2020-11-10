import React from 'react';
import NavbarLogin from '../components/NavbarLogin';
import LoginComponent from './LoginComponent';
export default function AdminLogin() {
  return (
    <>
        <NavbarLogin />
      
      <br /><br /><br />
            <LoginComponent user="AdminGroup"/>
            <br /><br /><br />
      

    </>
  );
}
