import React, { useState } from "react";
import UserPool from "../UserPool";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { saveBuyer, saveSeller } from "../actions/userActions";
import { connect } from "react-redux";
//import { useHistory } from "react-router-dom";

function SignUpComponent(props) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(true);
  const [shows, setShows] = useState(false);

  var dataFirstName = {
    // change custom:firstName to custom:firstname before code merge and remove one custom
    Name: "custom:firstName",
    Value: firstname,
  };

  var dataLastName = {
    // change custom:lastName to custom:lastname before code merge and remove one custom
    Name: "custom:lastName",
    Value: lastname,
  };

  var datagroupName = {
    Name: "custom:groupname",
    Value: props.groupname,
  };

  var dataPhoneNumber = {
    // change custom:firstName to custom:firstname before code merge
    Name: "custom:phoneNumber",
    Value: phoneNumber,
  };

  var attributeList = [];
  var attributeFirstName = new CognitoUserAttribute(dataFirstName);
  var attributeLastName = new CognitoUserAttribute(dataLastName);
  var attributeGroupName = new CognitoUserAttribute(datagroupName);
  var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeGroupName);
  attributeList.push(attributePhoneNumber);
  //let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        setShow(false);
        setShows(true);
        setPassword("");
        setEmail("");
        console.log(data);
        if (props.groupname === "SellerGroup") {
          const seller = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: phoneNumber,
            sellerId: data.userSub,
          };
          console.log(seller);
          props.saveSeller(seller);
        } else {
          const buyer = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: phoneNumber,
            buyerId: data.userSub,
          };
          console.log(buyer);
          props.saveBuyer(buyer);
        }
      }
    });
  };

  return (
    <div>
      <Container>
        <Alert show={show} variant="warning">
          <Alert.Heading>Sign Up below!</Alert.Heading>
        </Alert>
        <br />
        <Alert variant="success">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formFirstName">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Label>First Name </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter firstname"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Label>Last Name </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter lastname"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Label>Email </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Label>Phone Number </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Label>Password</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col md={{ span: 5, offset: 5 }}>
                <Button variant="info" type="submit">
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </Alert>
        <br />
        <Alert show={shows} variant="warning">
          <Alert.Heading>Sign Up Successful!</Alert.Heading>
        </Alert>
      </Container>
    </div>
  );
}
export default connect(null, { saveBuyer, saveSeller })(SignUpComponent);
