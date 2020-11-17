//feature-1
import React from "react";
import Filter from "./Filter";
import Product from "./Product";
import data from "../../data.json";
import Cart from "./Cart";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { getCart, saveCart } from "../../actions/cartActions";
import Pool from "../../UserPool";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      /*need to replace the products array with products array from Backend API*/
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
  componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      this.props.getCart(user.getUsername());
    }
  }
  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.category.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  createOrder = (order) => {
    console.log(order);
    alert("Save order for" + order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  addToCart = (product) => {
    let cart = {};
    let orderDetail = {};
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      if (!this.props.cart) {
        orderDetail = {
          product: product,
          quantity: 1,
          orderDetailAmount: product.price,
        };
        cart = {
          buyerId: id,
          orderDetails: [orderDetail],
        };
        console.log(cart);
        this.props.saveCart(id, cart);
      } else {
        let alreadyInCart = false;
        this.props.cart.forEach((item) => {
          if (item.product.productId === product.productId) {
            orderDetail = {
              ...item,
              quantity: item.quantity,
            };
            alreadyInCart = true;
          }
        });
        if (!alreadyInCart) {
          orderDetail = {
            product: product,
            quantity: 1,
            orderDetailAmount: product.price,
          };
        }
        cart = {
          buyerId: id,
          orderDetails: [...this.props.cart, orderDetail],
        };

        console.log(cart);
        this.props.saveCart(id, cart);
      }
    }
  };
  updateRating = (newRating, product) => {
    console.log(newRating, product);
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };
  render() {
    console.log(this.props.cart);
    return (
      <>
        <Navbar />
        <div className="grid-container">
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Product addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

function mapStateToProps({ products, cart }) {
  return { products, cart };
}

export default connect(mapStateToProps, { getCart, saveCart })(Home);
