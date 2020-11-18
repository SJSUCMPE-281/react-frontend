import React, {Component} from 'react';
import NavbarSeller from './NavbarSeller';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Pool from '../UserPool';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class SellerProfile extends Component {
  constructor(props) {
      super(props)
    
      this.state = {
              isRegistered: false,
              email:'',
              firstname:'',
              lastname:'',
              shopname:'',
              shopdescription:'',
              showRegisterModal:false,
              uuid:''
      }
      this.registerShop = this.registerShop.bind(this);
      this.confirmRegistration = this.confirmRegistration.bind(this);
  
  }
  registerShop(){
    this.setState({showRegisterModal:true});
  }
  confirmRegistration(){

    this.setState({showRegisterModal:false,isRegistered:true});
    console.log(this.state);
        /*Axios to save the shop name and shop description to database 
    Pass UUID, Shop name and Shop description available in state attributes to the API.*/

  }
  closeModal = () => {
    this.setState({showRegisterModal:false})
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
   /*Axios to fetch whether the shop is registered. if registered, set 'isRegistered' in state as true, else false*/
  }



  render() {
      return (
          <>
          <NavbarSeller />
          {!this.state.isRegistered ? (
                <div className="profile-details">
                           <Button variant="success"  onClick={this.registerShop}>
                              REGISTER YOUR SHOP
                            </Button>
                            <br />
                            <br />
                    <Container>
                    <h2>My Profile</h2>
                    <hr />
                    <Form>
  <Form.Group as={Row} controlId="formPlaintextFirstName">
    <Form.Label column sm="2">
      First Name
    </Form.Label>
    <Col sm="10">
      <Form.Control size="lg" plaintext value={this.state.firstname} />
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

  
</Form>
</Container>
{this.state.showRegisterModal && <Modal isOpen={true} onRequestClose={this.closeModal}>
                 <Zoom>
                     <button className="close-modal" onClick={this.closeModal}>x</button>
                     <h2 className="center">REGISTER YOUR SHOP</h2>

                     <Form>

                        <Form.Group controlId="formShopName">

                        <Row>
                        <Col md={{ span: 6, offset: 3 }}><Form.Label>Shop Name</Form.Label></Col>
                        </Row>
                        <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                        <Form.Control required type="text" placeholder="Enter shopname" value={this.state.shopname}
                        onChange={event => this.setState({shopname:event.target.value})} /></Col>
                        </Row>
                        </Form.Group>

                        <Form.Group controlId="formShpDescription">
                        <Row>
                        <Col md={{ span: 6, offset: 3 }}><Form.Label>Shop Description </Form.Label></Col>
                        </Row>
                        <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                        <Form.Control required type="text" placeholder="Enter shop description" value={this.state.shopdescription}
                        onChange={event => this.setState({shopdescription:event.target.value})} /></Col>
                        </Row>
                        </Form.Group>

                        <Row>
                            <Col md={{ span: 5, offset: 5 }}>
                                <Button variant="info" onClick={this.confirmRegistration}>
                                    Register Shop
                            </Button></Col>
                        </Row>
                          
                        </Form>
                  </Zoom> </Modal>}
                </div>
                )
                :
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
             </div>}
      </>)
  }
}

export default SellerProfile;