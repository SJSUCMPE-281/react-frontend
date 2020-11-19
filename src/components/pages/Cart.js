import React, { Component } from "react";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { getCart, saveCart, deleteCart } from "../../actions/cartActions";
import Pool from "../../UserPool";
import StripeButton from "./StripeButton";

class Cart extends Component {
  componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      this.props.getCart(user.getUsername());
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      orderDetails: [],
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //   createOrder = (e) => {
  //     e.preventDefault();
  //     const order = {
  //       name: this.state.name,
  //       email: this.state.email,
  //       address: this.state.address,
  //       cartItems: this.props.cartItems,
  //     };
  //     this.props.createOrder(order);
  //   };

  removeFromCart = (item) => {
    let cart = {};
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      console.log(item);
      const cartItems = this.state.orderDetails.slice();
      console.log("cartItems", cartItems);
      let order = cartItems.filter(
        (x) => x.product.productId === item.product.productId
      );
      if (order[0].quantity > 1 && cartItems.length >= 1) {
        order[0].quantity--;
        cart = {
          buyerId: id,
          orderDetails: [...this.state.orderDetails],
        };
        this.props.saveCart(id, cart);
      } else if (cartItems.length > 1) {
        let newOrder = cartItems.filter(
          (x) => x.product.productId !== item.product.productId
        );
        console.log("newOrder", newOrder);
        cart = {
          buyerId: id,
          orderDetails: [...newOrder],
        };
        console.log(cart);
        this.props.saveCart(id, cart);
      } else {
        this.props.deleteCart(id);
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps;
    this.setState({ orderDetails: cart.orderDetails });
  }
  renderCart() {
    if (!this.props.cart) {
      return <div className="cart cart-header">Cart is Empty!</div>;
    } else {
      return (
        <div>
          <div className="cart cart-header">
            {" "}
            You have {this.props.cart.orderDetails.length} in the cart{" "}
          </div>
          <div>
            <div className="cart">
              <Fade left cascade>
                <ul className="cart-items">
                  {this.props.cart.orderDetails.map((item) => (
                    <li key={item.product.productId}>
                      <div>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.productName}
                        ></img>
                      </div>
                      <div>
                        <div>{item.product.productName}</div>
                        <div className="right">
                          {formatCurrency(item.product.price)} X {item.quantity}{" "}
                          <button onClick={() => this.removeFromCart(item)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
            {this.props.cart && (
              <div>
                <div className="center">
                  Total : {formatCurrency(this.props.cart.totalPrice)}
                </div>
                <br />
                <div className="center">
                  Tax (5%): {formatCurrency(this.props.cart.taxAmount)}
                </div>
                <div className="cart">
                  <div className="total">
                    <div>
                      Total : {formatCurrency(this.props.cart.totalAmount)}
                    </div>
                    <StripeButton cart={this.props.cart} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderCart()}</div>;
  }
}
function mapStateToProps({ cart }) {
  return { cart };
}
export default connect(mapStateToProps, { getCart, saveCart, deleteCart })(
  Cart
);
