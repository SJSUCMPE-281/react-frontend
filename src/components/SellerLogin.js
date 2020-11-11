import React from 'react';
import NavbarLogin from '../components/NavbarLogin';
import LoginComponent from './LoginComponent';
import Alert from 'react-bootstrap/Alert';

export default function SellerLogin() {
  return (
    <>
    <NavbarLogin user="SellerGroup"/>
  
  <br />
  <Alert className="center" variant="warning">
                    <Alert.Heading>Manage Your Shop!</Alert.Heading>
                    </Alert>
                    <br /><br />
        <LoginComponent user="SellerGroup"/>
        <br /><br /><br />
  

</>
  );
}
