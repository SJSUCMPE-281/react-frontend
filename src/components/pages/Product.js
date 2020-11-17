import React, { Component } from "react";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { product } = this.state;
    const { products } = this.props.products;
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
                  <h5 className="text-muted">{product.shopName}</h5>
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
                    <div>{formatCurrency(product.price)}</div>
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
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.imageUrl} alt={product.productName}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.productName}</strong>
                  </p>
                  <p>{product.productDescription}</p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
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
                </div>
              </div>
            </Zoom>{" "}
          </Modal>
        )}
      </div>
    );
  }
}
function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps, { getProducts })(Product);
