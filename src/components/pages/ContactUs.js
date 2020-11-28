import React from 'react';
import '../../App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
export default function ContactUs() {
  return (
    <>
   <div>

        <div className="profile-details">
          <Container>
            <h2>Contact-Us</h2>
            <hr />
            <Form>
            <Form.Row size="lg">
    <Form.Group as={Col} controlId="formfirstname">
    <Form.Label>
                  Phone Number
                </Form.Label>
               
                  <Form.Control size="lg" type="text" readOnly placeholder="+1-408-478-9090" />
               
    
      </Form.Group>
  </Form.Row>
  <Form.Row>
      <Form.Group as={Col} controlId="formlastname">
      <Form.Label>
                 Email
                </Form.Label>
                  <Form.Control size="lg" type="text" readOnly placeholder="saasshoppe@gmail.com" />
      </Form.Group>
  </Form.Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  )
}
