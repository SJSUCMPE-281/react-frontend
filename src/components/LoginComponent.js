import React, { useState, useContext} from 'react';
import { AccountContext} from './Accounts';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from "react-router-dom";
import SignUpComponent from './SignUpComponent';

function LoginComponent(props){
    console.log(props.user);
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate } = useContext(AccountContext);
    const [signup, setSignup] = useState(false);
    const [warn, setWarn] = useState(false);

    const showSignUp = () => {
        setSignup(true);
    }
    const showLogin = () => {
        setSignup(false);
    }
    const onSubmit = event => {
        event.preventDefault();
        console.log(history);
        
        authenticate(email, password).then(
            data => {
                console.log("logged in!",data);
                var user_id=data.accessToken.payload.username;
                console.log(user_id);
                console.log(data.accessToken.payload["cognito:groups"][0]);
                //history.push(`/dashboard/${user_id}`);
                let group = data.accessToken.payload["cognito:groups"][0];
                if(group === props.user){
                    if(group === "CustomerGroup"){
                        history.push('/home');
                    }
                    else if (group === "SellerGroup"){
                        history.push('/sellerhome');
                    }
                }
                else{
                    setWarn(true);
                    console.log("You seem to have logged in through the incorrect tab!")
                }
            }).catch(err =>{
                console.error("Failed to login!", err);
            })
    };

    return (

        <div>
            
            {signup ? 
            <div><div>
            <SignUpComponent />
            <Container>
            <p onClick={showLogin}>Back to Login screen</p>
            </Container>
            </div></div>
            :
            <div><Container>
            <Alert variant="success">
                <Form onSubmit={onSubmit}>
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
                                Login
                        </Button></Col>
                    </Row>
                </Form>
                <p onClick={showSignUp}>New User? Sign Up</p>
            </Alert>
            <Alert show={warn} variant="danger">
                <Alert.Heading>You seem to have logged in through the incorrect tab!</Alert.Heading>
            </Alert>
        </Container></div>
        }
             
               
        </div>
    );
}
export default LoginComponent;