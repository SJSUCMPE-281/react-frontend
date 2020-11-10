import React, { useState } from 'react';
import UserPool from '../UserPool';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
//import { useHistory } from "react-router-dom";

function SignUpComponent(props){
    console.log(props.groupname);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [shows, setShows] = useState(false);


    var dataFirstName = {
        Name: "custom:firstname",
        Value: firstname,
      };
    
      var dataLastName = {
        Name: "custom:lastname",
        Value: lastname,
      };
    
      var datagroupName = {
        Name: "custom:groupname",
        Value: props.groupname,
      };

      var attributeList = [];
      var attributeFirstName = new CognitoUserAttribute(dataFirstName);
      var attributeLastName = new CognitoUserAttribute(dataLastName);
      var attributeGroupName = new CognitoUserAttribute(datagroupName);
    
      attributeList.push(attributeFirstName);
      attributeList.push(attributeLastName);
      attributeList.push(attributeGroupName);
      //let history = useHistory();
     
    const onSubmit = event => {
        event.preventDefault();

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err){
                console.error(err);
            }
            else{
                setShow(false);
                setShows(true);
                setPassword('');
                setEmail('');
            }
        });
    };

    return (
        <div>
            <Container>
                <Alert show={show} variant="warning">
                    <Alert.Heading>Sign Up below!</Alert.Heading>
                    </Alert>
                    <br/>
                <Alert variant="success">
                    
                    <Form onSubmit={onSubmit}>

                    <Form.Group controlId="formFirstName">

<Row>
    <Col md={{ span: 6, offset: 3 }}><Form.Label>First Name </Form.Label></Col>
</Row>
<Row>
    <Col md={{ span: 6, offset: 3 }}>
    <Form.Control type="text" placeholder="Enter firstname" value={firstname}
            onChange={event => setFirstname(event.target.value)} /></Col>
</Row>
</Form.Group>



<Form.Group controlId="formLastName">

<Row>
    <Col md={{ span: 6, offset: 3 }}><Form.Label>Last Name </Form.Label></Col>
</Row>
<Row>
    <Col md={{ span: 6, offset: 3 }}>
    <Form.Control type="text" placeholder="Enter lastname" value={lastname}
            onChange={event => setLastname(event.target.value)} /></Col>
</Row>
</Form.Group>


                     
                            <Form.Group controlId="formBasicEmail">

                            <Row>
                                <Col md={{ span: 6, offset: 3 }}><Form.Label>Email </Form.Label></Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}>
                                <Form.Control type="email" placeholder="Enter email" value={email}
                                        onChange={event => setEmail(event.target.value)} /></Col>
                            </Row>
                            </Form.Group>




                            <Form.Group controlId="formBasicPassword">
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}><Form.Label>Password</Form.Label></Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}><Form.Control type="password" placeholder="Password" value={password}
                                    onChange={event => setPassword(event.target.value)} /></Col>
                        </Row>
                    </Form.Group>


                    <Row>
                        <Col md={{ span: 5, offset: 5 }}>
                            <Button variant="info" type="submit">
                                Sign Up
                        </Button></Col>
                    </Row>
                       
                    </Form>
                   
                </Alert>
                <br/>
                <Alert show={shows} variant="warning">
                    <Alert.Heading>Sigun Up Successful!</Alert.Heading>
                    </Alert>
            </Container>
        </div>
    );
}
export default SignUpComponent;