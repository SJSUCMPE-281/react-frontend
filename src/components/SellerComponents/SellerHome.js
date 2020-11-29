import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Fade from "react-reveal/Fade";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <Container>
          <div>
            <Fade bottom cascade>
              <CardColumns>
                <Card>
                  <Card.Body>
                    <Card.Title>Products</Card.Title>
                    <Card.Text>
                     View the list of products in your shop!{" "}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/sellerhome/products" className="navbar-logo">
                      <Button variant="secondary">Products</Button>
                    </Link>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Add Products</Card.Title>
                    <Card.Text>
                      Add new products to your shop!{" "}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/sellerhome/addproduct/_add" className="navbar-logo">
                      <Button variant="secondary">Add Products</Button>
                    </Link>
                  </Card.Footer>
                </Card>
                
                <Card>
                  <Card.Body>
                    <Card.Title>Open Orders</Card.Title>
                    <Card.Text>Check if you have got new Orders and deliver them soon. Your customers are waiting! </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/sellerhome/orders/ORDERED" className="navbar-logo">
                      <Button variant="secondary">Open Orders</Button>
                    </Link>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Closed Orders</Card.Title>
                    <Card.Text>View closed Orders! </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/sellerhome/orders/SHIPPED" className="navbar-logo">
                      <Button variant="secondary">Closed Orders</Button>
                    </Link>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text>View Your Profile Information!</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to="/sellerhome/sellerprofile" className="navbar-logo">
                      <Button variant="secondary">View Your Profile</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </CardColumns>
            </Fade>
          </div>
        </Container>
      </div>
    );
  }
}

export default SellerHome;
