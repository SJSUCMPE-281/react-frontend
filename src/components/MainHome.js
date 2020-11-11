import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainHeader from './MainHeader';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

export default function MainHome() {
    let history = useHistory();


    const admin = () => {
      history.push("/admin");
  }
  return (
    <>
    <MainHeader />
    
    <Container>
    <Button variant="info" className="margin" onClick={admin}>
                        Admin Panel
                            </Button>
    <div className="middle">
   <Fade bottom cascade>
    <CardDeck className="width">
  <Card>
    <Card.Img variant="top" className="imagesize" src="../images/happyshopping.jpg" alt="pic1"/>
    <Card.Body>
      <Card.Title>Happy Shopping!</Card.Title>
      <Card.Text>
        One Stop Shop to get all that you need from stores around you !{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Link to='/customer' className='navbar-logo'>
    <Button variant="primary">Fill Your Cart</Button>
        </Link>
   
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" className="imagesize" src="../images/registernow.jpg" alt="pic2"/>
    <Card.Body>
      <Card.Title>Register Your Shop right now!</Card.Title>
      <Card.Text>
        Millions of customers awaiting your prodcuts just a step away!{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Link to='/seller' className='navbar-logo'>
    <Button variant="primary">Add Your Shop</Button>
        </Link>
  
    </Card.Footer>
  </Card>
</CardDeck>
</Fade>
</div>
</Container>

    </>
  )
}
