import React, { Component } from "react";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  getProduct,
  getReviews,
  saveProductReview,
} from "../../actions/productActions";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";
import Pool from "../../UserPool";
import { withRouter } from "react-router-dom";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      reviews: [],
      rating: "",
      review: "",
    };
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
    this.setState({ product: null, rating: "", review: "" });
  };

  addReview = () => {
    this.closeModal();
    const user = Pool.getCurrentUser();
    if (user) {
      const userId = user.getUsername();
      user.getSession(async (err, session) => {
        if (!err) {
          let firstname = session.getIdToken().payload["custom:firstName"];
          let lastname = session.getIdToken().payload["custom:lastName"];

          let newReview = {
            buyerId: userId,
            buyerName: firstname + " " + lastname,
            product: this.state.product,
            rating: this.state.rating,
            review: this.state.review,
          };
          let prodId = this.state.product.productId;
          console.log(newReview);
          await this.props.saveProductReview(
            this.props.history,
            prodId,
            newReview
          );
          window.location.reload(false);
        }
      });
    }
  };
  renderProductModal() {
    const { product, reviews } = this.state;
    const ratingChanged = (newRating) => {
      console.log(newRating);
      this.setState({ rating: newRating });
    };
    return (
      <div>
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
                    <div>{product.price}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
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
                      <Form.Control
                        type="text"
                        placeholder="Enter review"
                        onChange={(event) =>
                          this.setState({ review: event.target.value })
                        }
                      />
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

  render() {
    const { products } = this.props.products;
    console.log(this.props);
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {products.map((product) => (
              <li key={product.productId}>
                <div className="container product">
                  <a
                    href={"#" + product.productId}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.imageUrl} alt={product.productName}></img>
                    <p>{product.productName}</p>
                  </a>
                  <Link to={"/shopview/" + product.sellerId}>
                    <h5 className="text-muted">{product.shopName}</h5>
                  </Link>
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
                    {product.reviewCount}
                  </span>
                  <div className="product-price">
                    <div>{product.price}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {this.renderProductModal()}
      </div>
    );
  }
}
function mapStateToProps({ products, reviews }) {
  return { products, reviews };
}

export default connect(mapStateToProps, {
  getProduct,
  getReviews,
  saveProductReview,
})(withRouter(Product));
