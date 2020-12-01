import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import MainHeader from "./MainHeader";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

export default function MainHome() {

  return (
    <>
      <MainHeader />

      <Container>
        <div className="middle">
          <Fade bottom cascade>
            <CardDeck className="width">
              <Card>
                <Card.Img
                  variant="top"
                  className="imagesize"
                  src="https://marketplace-image-store.s3.amazonaws.com/WhatsApp+Image+2020-11-20+at+11.57.34+AM.jpeg"
                  alt="pic1"
                />
                <Card.Body>
                  <Card.Title>Happy Shopping!</Card.Title>
                  <Card.Text>
                    One Stop Shop to get all that you need from stores around
                    you !{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/customer" className="navbar-logo">
                    <Button variant="primary">Fill Your Cart</Button>
                  </Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  className="imagesize"
                  src="https://marketplace-image-store.s3.amazonaws.com/WhatsApp+Image+2020-11-20+at+11.57.34+AM+(1).jpeg"
                  alt="pic2"
                />
                <Card.Body>
                  <Card.Title>Register Your Shop right now!</Card.Title>
                  <Card.Text>
                    Millions of customers awaiting your prodcuts just a step
                    away!{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/seller" className="navbar-logo">
                    <Button variant="primary">Add Your Shop</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Fade>
        </div>
      </Container>
    </>
  );
}
