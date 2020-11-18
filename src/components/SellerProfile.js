import React, {Component} from 'react';
import NavbarSeller from './NavbarSeller';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Pool from '../UserPool';


class SellerProfile extends Component {
  constructor(props) {
      super(props)
    
      this.state = {
              email:'',
              firstname:'',
              lastname:'',
              shopname:'',
              shopdescription:'',
              uuid:''
      }
  
  }

  componentDidMount(){
    //fetch the seller information
    const user = Pool.getCurrentUser();
    if (user) {
        user.getSession((err, session) => {
          if (!err) {
            console.log(session);
            this.setState({email:session.getIdToken().payload["email"]})
            this.setState({firstname:session.getIdToken().payload["custom:firstName"]})
            this.setState({lastname:session.getIdToken().payload["custom:lastName"]})
            this.setState({uuid:session.getAccessToken().payload["username"]})
          } 
        });
      } 
  
  }



  render() {
      return (
          <>
          <NavbarSeller />
                <div className="profile-details">
                 <Container>
                 <h2>My Profile</h2>
                 <hr />
                 <Form>
                  <Form.Group as={Row} controlId="formPlaintextFirstName">
                  <Form.Label column sm="2">
                    First Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext  value={this.state.firstname} />
                  </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextLastName">
                  <Form.Label column sm="2">
                    Last Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext  value={this.state.lastname} />
                  </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext  value={this.state.email}/>
                  </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextShopName">
                  <Form.Label column sm="2">
                    Shop Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext  value={this.state.shopname} />
                  </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextShopDesc">
                  <Form.Label column sm="2">
                    Shop Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext  value={this.state.shopdescription} />
                  </Col>
                  </Form.Group>
                  </Form>
                  </Container>
             </div>
      </>)
  }
}

export default SellerProfile;