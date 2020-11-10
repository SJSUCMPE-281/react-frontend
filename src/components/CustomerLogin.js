import React from 'react';
import LoginComponent from './LoginComponent';
import NavbarLogin from '../components/NavbarLogin';

export default function CustomerLogin() {
  return (
    <>
        <NavbarLogin />
      
      <br /><br /><br />
            <LoginComponent user="CustomerGroup"/>
            <br /><br /><br />
      

    </>
  );
}
