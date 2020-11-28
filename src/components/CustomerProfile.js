import React, { useState,}from 'react';
import OrdersPlaced from './OrdersPlaced';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Pool from '../UserPool';

function CustomerProfile() {
    const [profile, setProfile] = useState(true);
    const [sideBar, setSideBar] = useState(false);
    let email = '';
    let firstname = '';
    let lastname ='';

    const user = Pool.getCurrentUser();
    if (user) {
        user.getSession((err, session) => {
          if (!err) {
            console.log(session);
            email=session.getIdToken().payload["email"];
            firstname=session.getIdToken().payload["custom:firstName"];
            lastname=session.getIdToken().payload["custom:lastName"];
          } 
        });
      } 
    
    const showOrders = () => {
        setProfile(false);
        handleSidebar();
    }
    const showProfile = () => {
        setProfile(true);
        handleSidebar();
    }
    const handleSidebar = () => {
       if(sideBar === true){
        setSideBar(false);
       }
       else{
        setSideBar(true);
       }
      }
        return (
            <>
      <div>
        <header className="header">
          <div className="navContainer">
            <nav>
              <ul
                className="mainNav"
                style={sideBar ? { transform: "translateX(0)" } : null}
                >
                <li className='nav-item'
                onClick = {showProfile}>
              My Profile
           
                <hr />
                </li>
                <li className='nav-item'
                onClick = {showOrders}>
            
              My Orders
           
            <hr />
                </li>              
              </ul>
            </nav>
            <button
              onClick = {handleSidebar}
              className={`navToggle ${sideBar ? "open" : null}`}>
              <span />
              <span />
              <span />
            </button>
            <div
              onClick={handleSidebar}
              className={`overlay ${sideBar ? "open" : ""}`}
              />
          </div>
        </header>
        <div className ="wrapper"></div>
      </div>
      {profile ? (
                <div className="profile-details">
                    <Container>
                    <h2>My Profile</h2>
                    <hr />
                    <Form>
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      First Name
    </Form.Label>
    <Col sm="10">
      <Form.Control size="lg" type="text" readOnly value={firstname} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      Last Name
    </Form.Label>
    <Col sm="10">
      <Form.Control size="lg" type="text" readOnly value={lastname} />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control size="lg" type="text" readOnly value={email}/>
    </Col>
  </Form.Group>

  
</Form>
</Container>
                </div>
                )
                :
                <div>
                <OrdersPlaced  />
                </div>}
     
    
            </>
        )
    
}
export default CustomerProfile