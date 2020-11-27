import React, { Component } from "react";
import NavbarSeller from "./NavbarSeller";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { getSeller } from "../actions/userActions";
import Pool from "../UserPool";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { getBilling } from "../actions/billingActions";
import formatCurrency from "../util";
import { saveMedia, clearMedia  } from "../actions/mediaActions";
import {
  saveSellerImages
} from "../actions/sellerProductActions";

class SellerProfile extends Component {
  constructor(props) {
    super(props);
    this.shopImagesInput = React.createRef();
    this.state = {
      userState: {},
      showUploadModal: false,
      showBillingModal: false,
      image: "",
      file:""
    };

    this.changeShopImageHandler = this.changeShopImageHandler.bind(this);
  }

  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      const response = await this.props.getSeller(id);
      console.log(response);
      this.setState({ userState: this.props.user.seller });
      this.props.getBilling(id);
    }
  }
  uploadMoreImages = () => {
    this.setState({ showUploadModal: true });
  };
  closeModal = () => {
    this.setState({ showUploadModal: false, showBillingModal: false });
  };
  changeShopImageHandler = (event) => {
    this.setState({ image: event.target.value,
    file:event.target.files[0]});
    const files = event.target.files;
    console.log(files);
    this.props.saveMedia(files);
  };
  componentWillUnmount() {
    this.props.clearMedia();
  }
  confirmUpload = () => {
    this.setState({ showUploadModal: false });
    
    /*Axios to save the shop name and shop description to database 
Pass Shop name and Shop description available in state attributes to the API.*/
  let sellerId = this.props.user.seller.sellerId;
  const { images } = this.props.images;
  console.log(sellerId);
  console.log(...images);
  console.log(this.state.file);
  this.props.saveSellerImages(sellerId,this.state.file);
  window.location.pathname = "/sellerprofile";
  };
  handleBilling = () => {
    this.setState({ showBillingModal: true });
  };

  computeSum = () => {
    let subtotal = this.props.billing.saleAmount * 0.01;
    return formatCurrency(subtotal);
  };
  render() {
    console.log(this.props.user);
    console.log(this.props.billing);
    console.log(this.props.images);

    return (
      <>
        <NavbarSeller />
        {Object.keys(this.state.userState).length === 0 ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            {this.state.userState.shopName === null ? null : (
              <>
                <div className="profile-details">
                  <Container>
                    {this.state.userState.mediaList.length === 0 ? (
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={this.uploadMoreImages}
                      >
                        Upload Shop Images
                      </Button>
                    ) : (
                      <div className="carouselWidthHeight">
                        <Carousel>
                          {this.state.userState.mediaList.map((pic, index) => (
                            <Carousel.Item key={index}>
                              <img
                                className="profileImage"
                                src={pic.url}
                                alt=""
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                        <br />
                        <Button
                          variant="warning"
                          size="lg"
                          className="center"
                          onClick={this.uploadMoreImages}
                        >
                          Upload More Images
                        </Button>{" "}
                        <Button
                          variant="warning"
                          size="lg"
                          className="center"
                          onClick={this.handleBilling}
                        >
                          My Billing
                        </Button>
                        <br />
                        {this.state.showUploadModal && (
                          <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                              <button
                                className="close-modal"
                                onClick={this.closeModal}
                              >
                                x
                              </button>
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
                                            onChange={
                                              this.changeShopImageHandler
                                            }
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
                            </Zoom>{" "}
                          </Modal>
                        )}
                        {this.state.showBillingModal && (
                          <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                              <button
                                className="close-modal"
                                onClick={this.closeModal}
                              >
                                x
                              </button>
                              <h2 className="center">Billing Information</h2>
                              <Container>
                                <Form>
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextSubTotal"
                                    readOnly
                                  >
                                    <Form.Label column md="2">
                                      Fixed Amount Due
                                    </Form.Label>
                                    <Col sm="10">
                                      <Form.Control
                                        size="md"
                                        plaintext
                                        value="$10"
                                      />
                                    </Col>
                                  </Form.Group>
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextFirstName"
                                    readOnly
                                  >
                                    <Form.Label column md="2">
                                      Number of orders placed this month
                                    </Form.Label>
                                    <Col sm="10">
                                      <Form.Control
                                        size="md"
                                        plaintext
                                        value={this.props.billing.saleCount}
                                      />
                                    </Col>
                                  </Form.Group>
                                  <Form.Group
                                    as={Row}
                                    readOnly
                                    controlId="formPlaintextFirstName"
                                    readOnly
                                  >
                                    <Form.Label column md="2">
                                      Total Sale Amount
                                    </Form.Label>
                                    <Col sm="10">
                                      <Form.Control
                                        size="md"
                                        plaintext
                                        value={formatCurrency(
                                          this.props.billing.saleAmount
                                        )}
                                      />
                                    </Col>
                                  </Form.Group>
                                  <hr></hr>
                                  <Form.Group
                                    as={Row}
                                    controlId="formPlaintextFirstName"
                                    readOnly
                                  >
                                    <Form.Label column md="2">
                                      Total Payment Due
                                    </Form.Label>
                                    <Col sm="10">
                                      <Form.Control
                                        size="md"
                                        plaintext
                                        value={this.computeSum()}
                                      />
                                    </Col>
                                  </Form.Group>
                                </Form>
                              </Container>
                            </Zoom>{" "}
                          </Modal>
                        )}
                      </div>
                    )}
                    <br />
                  </Container>
                </div>
              </>
            )}
            <Container className="profileMargin">
              <h2>My Profile</h2>
              <hr />
              <Form>
                <Form.Group as={Row} controlId="formPlaintextFirstName">
                  <Form.Label column sm="2">
                    First Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      size="lg"
                      plaintext
                      value={this.state.userState.firstName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextLastName">
                  <Form.Label column sm="2">
                    Last Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      size="lg"
                      plaintext
                      value={this.state.userState.lastName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      size="lg"
                      plaintext
                      value={this.state.userState.email}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPhoneNumber">
                  <Form.Label column sm="2">
                    Phone Number
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      size="lg"
                      plaintext
                      value={this.state.userState.phoneNumber}
                    />
                  </Col>
                </Form.Group>
                {this.state.userState.shopName !== null ? (
                  <>
                    <Form.Group as={Row} controlId="formPlaintextShopName">
                      <Form.Label column sm="2">
                        Shop Name
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          size="lg"
                          plaintext
                          value={this.state.userState.shopName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextShopDesc">
                      <Form.Label column sm="2">
                        Shop Description
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          size="lg"
                          plaintext
                          value={this.state.userState.shopDescription}
                        />
                      </Col>
                    </Form.Group>
                  </>
                ) : (
                  <Link to="/listproducts">
                    <Button variant="primary">Please Register Your Shop</Button>
                  </Link>
                )}
              </Form>
            </Container>
          </>
        )}
      </>
    );
  }
}
function mapStateToProps({ images, user, billing }) {
  return { images, user, billing };
}
export default connect(mapStateToProps, {
  saveMedia,
  saveSellerImages,
  getSeller,
  getBilling,
  clearMedia,
})(SellerProfile);
