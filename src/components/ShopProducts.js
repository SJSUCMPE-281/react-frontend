import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { getSellerProducts } from "../actions/sellerProductActions";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { getProduct, getReviews } from "../actions/productActions";
import Carousel from "react-bootstrap/Carousel";
import { withRouter } from "react-router-dom";
import { getSeller } from "../actions/userActions";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

class ShopProducts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      product: null,
      rating: null,
      userState: {},
      reviews: [],
      sellerShopId: props.sellerShopId,
      review:'',
      rating:''
    };
    console.log("constructor",props.sellerShopId);
  }
  async openModal(product) {
    const resp = await this.props.getProduct(
      product.sellerId,
      product.productId
    );
    this.setState({
      product: this.props.products.product,
    });
    const data = await this.props.getReviews(product.productId);
    this.setState({ reviews: this.props.reviews.reviews });
  }

  closeModal = () => {
    this.setState({ product: null });
  };

  addReview = () => {
    console.log(this.state);
    this.closeModal();
  }

  async componentDidMount() {


      const id = this.state.sellerShopId;
      console.log("id",id);
      const response =  await this.props.getSeller(id);
      this.setState({ userState: this.props.user.seller });
      this.props.getSellerProducts(id);
    
  }


  renderShop() {
    const { sellerProducts } = this.props.sellerProducts;
    console.log("seller prod", sellerProducts);
    console.log(this.state.product);
    const ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({ rating: newRating })
  
      };
    if (this.state.userState.shopName === null) {
      return (
        <div>
          <h1>Not a Registered Shop</h1>
        </div>
      );
    }
    if (this.state.userState.shopName !== null && sellerProducts.length > 0) {
      console.log(this.state.userState);
      const { product, reviews } = this.state;
      console.log(this.props.reviews.reviews);
      console.log(reviews);
      return (
        <div>
            <h1 className="center">Our Products</h1>
              <hr />
          <Fade bottom cascade>
            <ul className="products">
              {sellerProducts.map((product) => (
                <li key={product.productId}>
                  <div className="product">
                    <a
                      href={"#" + product.productId}
                      onClick={() => this.openModal(product)}
                    >
                      {product.mediaList.length > 0 ? 
                      <img
                      src={product.mediaList[0].url}
                      alt={product.productName}
                    ></img> : null}
                      <p>{product.productName}</p>
                    </a>
                    <span>
                      <span className="widthhalf">
                        <ReactStars
                          count={5}
                          size={18}
                          edit={false}
                          isHalf={true}
                          color="gray"
                          activeColor="#f5b942"
                          value={product.rating}
                        />
                      </span>
                      ({product.reviewCount})
                    </span>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
          {product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  x
                </button>
                <div className="product-details">
                  <div className="carouselWidth">
                    <Carousel>
                      {product.mediaList.map((pic) => (
                        <Carousel.Item key={pic.mediaId}>
                          <img className="d-block w-100" src={pic.url} alt="" />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <div className="product-details-description">
                    <p>
                      <strong>{product.productName}</strong>
                    </p>
                    <p>{product.productDescription}</p>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>                     
                    </div>
                    <hr />
                    <h1 className="center">Reviews</h1>
                    <hr />
                    {reviews.length === 0 ? (
                      <div>No one has reviewed the product yet!</div>
                    ) : (
                      <ListGroup>
                        {reviews.map((review) => (
                          <ListGroup.Item key={review.reviewId}>
                            <h2>{review.buyerName}</h2>
                            <ReactStars
                              count={5}
                              size={18}
                              edit={false}
                              isHalf={true}
                              color="gray"
                              activeColor="#f5b942"
                              value={review.rating}
                            />
                            <Alert variant="dark">{review.review}</Alert>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                      <Form>
                    <hr />
                    <Form.Group controlId="review">
                      <Form.Label>Add Your Review</Form.Label>
                      <Form.Control type="text" placeholder="Enter review" onChange={event => this.setState({ review: event.target.value })} />
                    </Form.Group>
                    <ReactStars
                      count={5}
                      size={18}
                      edit={true}
                      isHalf={false}
                      color="gray"
                      activeColor="#f5b942"
                      value={0}
                      onChange={ratingChanged}
                    />
                    <Button variant="warning" onClick={this.addReview}>
                      Submit Your Review
                  </Button>
                  </Form>
                  </div>
                </div>
              </Zoom>{" "}
            </Modal>
          )}
        </div>
      );
    }
  }
  render() {
    return (
      <div>
          {Object.keys(this.state.userState).length === 0 && (
          <i className="fa fa-spinner fa-spin"></i>
        )}
        {this.renderShop()}
      </div>
    );
  }
}
function mapStateToProps({ sellerProducts, user , reviews, products }) {
  return { sellerProducts, user ,reviews, products };
}
export default connect(mapStateToProps, {
  getSellerProducts,
  getSeller,
  getProduct,
  getReviews,
})(withRouter(ShopProducts));
