import React from 'react';
import NavbarLogin from '../components/NavbarLogin';
import LoginComponent from './LoginComponent';
import Alert from 'react-bootstrap/Alert';

export default function AdminLogin() {
  return (
    <>
        <NavbarLogin user="AdminGroup"/>
      
      <br />
      <Alert className="center" variant="warning">
                    <Alert.Heading>Admin Panel</Alert.Heading>
                    </Alert>
                    <br /><br />
            <LoginComponent user="AdminGroup"/>
            <br /><br /><br />
      

    </>
  );
}
