import React, { Component } from 'react';
import NavbarSeller from './NavbarSeller';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Pool from '../UserPool';
import Carousel from "react-bootstrap/Carousel";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class SellerProfile extends Component {
  constructor(props) {
    super(props)
    this.shopImagesInput = React.createRef();
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      shopname: 'Hardcoded Shop Name',
      shopdescription: 'Hardcoded Shop Description',
      uuid: '',
      shopImages: [
        { "link": "/images/shop1.jpg" },
        { "link": "/images/shop2.jpg" }],
      showUploadModal: false,
    }
    this.changeShopImageHandler = this.changeShopImageHandler.bind(this);

  }
  uploadMoreImages = () => {
    this.setState({ showUploadModal: true });
  }
  closeModal = () => {
    this.setState({ showUploadModal: false })
  }
  changeShopImageHandler = (event) => {
    this.setState({ image: event.target.value });
    const files = event.target.files;
    console.log(files);
  };
  confirmUpload = () => {

    this.setState({ showUploadModal: false });
    console.log(this.state);
    /*Axios to save the shop name and shop description to database 
Pass Shop name and Shop description available in state attributes to the API.*/

  }
  componentDidMount() {
    //fetch the seller information
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (!err) {
          console.log(session);
          this.setState({ email: session.getIdToken().payload["email"] })
          this.setState({ firstname: session.getIdToken().payload["custom:firstName"] })
          this.setState({ lastname: session.getIdToken().payload["custom:lastName"] })
          this.setState({ uuid: session.getAccessToken().payload["username"] })
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
            {this.state.shopImages.length === 0 ? <Button variant="warning" size="lg" onClick={this.uploadMoreImages}>
              Upload Shop Images
                  </Button> : (
                <div className="carouselWidthHeight">
                  <Carousel>
                    {this.state.shopImages.map((pic, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100" src={pic.link} alt="" />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <br />
                  <Button variant="warning" size="lg" className="center" onClick={this.uploadMoreImages}>
                    Upload More Images
                  </Button>
                  <br />
                  {this.state.showUploadModal && <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                      <button className="close-modal" onClick={this.closeModal}>x</button>
                      <h2 className="center">Upload Images</h2>

                      <div className="container">
                        <div className="row">
                          <div className="card col-md-6 offset-md-3 offset-md-3">
                            <div className="card-body">
                              <form>
                                <div className="form-group upload-steps">
                                  <label> Image </label>
                                  <input
                                    required
                                    name="url"
                                    type="file"
                                    multiple
                                    ref={this.shopImagesInput}
                                    className="form-control"
                                    onChange={this.changeShopImageHandler}
                                  />
                                </div>
                                <button
                                  className="btn btn-success"
                                  onClick={this.confirmUpload}
                                >
                                  Upload
                            </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={this.closeModal}
                                  style={{ marginLeft: "10px" }}
                                >
                                  Cancel
                            </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Zoom> </Modal>}
                </div>
              )}
              <br />
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
                  <Form.Control size="lg" plaintext value={this.state.lastname} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                  </Form.Label>
                <Col sm="10">
                  <Form.Control size="lg" plaintext value={this.state.email} />
                </Col>
              </Form.Group>
              {this.state.shopname !== null ? (<><Form.Group as={Row} controlId="formPlaintextShopName">
                <Form.Label column sm="2">
                  Shop Name
                  </Form.Label>
                <Col sm="10">
                  <Form.Control size="lg" plaintext value={this.state.shopname} />
                </Col>
              </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextShopDesc">
                  <Form.Label column sm="2">
                    Shop Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control size="lg" plaintext value={this.state.shopdescription} />
                  </Col>
                </Form.Group>
              </>) :
                (<Link to='/listproducts'>
                  <Button variant="primary">Please Register Your Shop</Button>
                </Link>)}
            </Form>

          </Container>
        </div>
      </>)
  }
}

export default SellerProfile;