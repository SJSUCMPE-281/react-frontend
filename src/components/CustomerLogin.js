import React from 'react';
import LoginComponent from './LoginComponent';
import NavbarLogin from '../components/NavbarLogin';
import Alert from 'react-bootstrap/Alert';

export default function CustomerLogin() {
  return (
    <>
        <NavbarLogin user="CustomerGroup"/>
      
      <br />
      <Alert className="center" variant="warning">
                    <Alert.Heading>Happy Shopping!</Alert.Heading>
                    </Alert>
                    <br /><br />
            <LoginComponent user="CustomerGroup"/>
            <br /><br /><br />
      

    </>
  );
}
