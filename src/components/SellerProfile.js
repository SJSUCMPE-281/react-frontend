import React, { Component } from "react";
import NavbarSeller from "./NavbarSeller";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { getSeller } from "../actions/userActions";
import Pool from "../UserPool";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class SellerProfile extends Component {
  constructor(props) {
    super(props);
    this.shopImagesInput = React.createRef();
    this.state = {
      userState: {},
      showUploadModal: false,
      image:''
    }
    this.changeShopImageHandler = this.changeShopImageHandler.bind(this);
  }

  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      const response = await this.props.getSeller(id);
      console.log()
      this.setState({ userState: this.props.user.seller });
    }
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

  render() {
    console.log(this.props.user);
    console.log(this.state.userState);
    return (
      <>
        <NavbarSeller />
        {Object.keys(this.state.userState).length === 0 ?
          <i className="fa fa-spinner fa-spin"></i> : <>
          {this.state.userState.shopName === null ? null :

(
  <>
    <div className="profile-details">
      <Container>
      {this.state.userState.mediaList.length === 0 ? <Button variant="warning" size="lg" onClick={this.uploadMoreImages}>
          Upload Shop Images
              </Button> : 
            (
              <div className="carouselWidthHeight">
                <Carousel>
                  {this.state.userState.mediaList.map((pic, index) => (
                    <Carousel.Item key={index}>
                      <img className="profileImage" src={pic.url} alt="" />
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
      </Container>
    </div>
  </>)

        }
        <Container className="profileMargin">
        <h2>My Profile</h2>
        <hr />
        <Form>
          <Form.Group as={Row} controlId="formPlaintextFirstName">
            <Form.Label column sm="2">
              First Name
              </Form.Label>
            <Col sm="10">
              <Form.Control size="lg" plaintext value={this.state.userState.firstName} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextLastName">
            <Form.Label column sm="2">
              Last Name
              </Form.Label>
            <Col sm="10">
              <Form.Control size="lg" plaintext value={this.state.userState.lastName} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
              </Form.Label>
            <Col sm="10">
              <Form.Control size="lg" plaintext value={this.state.userState.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPhoneNumber">
            <Form.Label column sm="2">
              Phone Number
              </Form.Label>
            <Col sm="10">
              <Form.Control size="lg" plaintext value={this.state.userState.phoneNumber} />
            </Col>
          </Form.Group>
          {this.state.userState.shopName !== null ? (<><Form.Group as={Row} controlId="formPlaintextShopName">
            <Form.Label column sm="2">
              Shop Name
              </Form.Label>
            <Col sm="10">
              <Form.Control size="lg" plaintext value={this.state.userState.shopName} />
            </Col>
          </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextShopDesc">
              <Form.Label column sm="2">
                Shop Description
              </Form.Label>
              <Col sm="10">
                <Form.Control size="lg" plaintext value={this.state.userState.shopDescription} />
              </Col>
            </Form.Group>
          </>) :
            (<Link to='/listproducts'>
              <Button variant="primary">Please Register Your Shop</Button>
            </Link>)}
        </Form>
        </Container>
          </>
      }

      </>
    );
  }
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps, {
  getSeller,
})(SellerProfile);
