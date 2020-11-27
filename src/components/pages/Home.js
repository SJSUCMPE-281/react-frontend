//feature-1
import React from "react";
import Filter from "./Filter";
import Product from "./Product";
import Cart from "./Cart";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { getProducts, getSearchResult } from "../../actions/productActions";
import { getCart, saveCart, deleteCart } from "../../actions/cartActions";
import Pool from "../../UserPool";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { debounce } from "throttle-debounce";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      /*need to replace the products array with products array from Backend API*/
      products: [],
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
      value: "",
      suggestions: [],
    };
  }
  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      this.props.getCart(user.getUsername());
    }
    await this.props.getProducts();
    this.setState({ products: this.props.products.products });
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    );
  }

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
    let newCart = {};
    let orderDetail = {};
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      if (!this.props.cart) {
        console.log(product);
        if (product.imageUrl) {
          orderDetail = {
            product: product,
            quantity: 1,
            orderDetailAmount: product.price,
          };
        } else if (product.mediaList) {
          const newProduct = {
            productId: product.productId,
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price,
            sellerId: product.sellerId,
            shopName: product.shopName,
            imageUrl: product.mediaList[0].url,
            category: product.category,
          };
          console.log(newProduct);
          orderDetail = {
            product: newProduct,
            quantity: 1,
            orderDetailAmount: product.price,
          };
        }

        console.log(orderDetail);
        newCart = {
          buyerId: id,
          orderDetails: [orderDetail],
        };
        console.log(newCart);
        this.props.saveCart(id, newCart);
      } else {
        let alreadyInCart = false;
        this.props.cart.orderDetails.forEach((item) => {
          if (item.product.sellerId === product.sellerId) {
            if (item.product.productId === product.productId) {
              orderDetail = {
                ...item,
                quantity: item.quantity,
              };
              alreadyInCart = true;

              newCart = {
                buyerId: id,
                orderDetails: [...this.props.cart.orderDetails, orderDetail],
              };

              console.log(newCart);
              this.props.saveCart(id, newCart);
            }
            if (!alreadyInCart) {
              if (product.imageUrl) {
                orderDetail = {
                  product: product,
                  quantity: 1,
                  orderDetailAmount: product.price,
                };
              } else if (product.mediaList) {
                const newProduct1 = {
                  productId: product.productId,
                  productName: product.productName,
                  productDescription: product.productDescription,
                  price: product.price,
                  sellerId: product.sellerId,
                  shopName: product.shopName,
                  imageUrl: product.mediaList[0].url,
                  category: product.category,
                };
                console.log(newProduct1);
                orderDetail = {
                  product: newProduct1,
                  quantity: 1,
                  orderDetailAmount: product.price,
                };
              }

              newCart = {
                buyerId: id,
                orderDetails: [...this.props.cart.orderDetails, orderDetail],
              };

              console.log(newCart);
              this.props.saveCart(id, newCart);
            }
          } else {
            let choice = window.confirm(
              "You can only order from a single Seller. Want to clear your cart and start filling again?"
            );
            if (choice === true) {
              this.props.deleteCart(id);
            } else {
              console.log("Dont Clear the cart");
            }
          }
        });
      }
    }
  };
  updateRating = (newRating, product) => {
    console.log(newRating, product);
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState({
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
    });
  };
  renderSuggestion = (suggestion) => {
    return (
      <div className="result">
        <div>{suggestion.productName}</div>
        <div className="shortCode">{suggestion.shortCode}</div>
      </div>
    );
  };
  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .get(
        `https://b8pwzo8uoa.execute-api.us-east-1.amazonaws.com/test?q=${value}`
      )
      .then((res) => {
        const results = res.data.hits.hits.map((h) => h._source);
        this.setState({ suggestions: results });
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
    this.props.getProducts();
    this.setState({ products: this.props.products.products });
  };

  handleSearchClick = () => {
    const param = {
      q: this.state.value,
    };
    this.props.getSearchResult(param);
    this.setState({ products: this.props.products.products });
  };
  render() {
    // const { cart } = this.props.cart;
    console.log(this.state.products);
    console.log(this.state.value);
    console.log(this.state.suggestions);
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "search product",
      value,
      onChange: this.onChange,
    };
    return (
      <>
        <Navbar />
        <div className="grid-container">
          <main>
            <div className="content">
              <div className="main">
                <div className="searchDiv">
                <div className="searchbox">
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={(suggestion) => suggestion.productName}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                  />
                </div>
                <button
                    className="btn btn-success"
                    onClick={this.handleSearchClick}
                  >
                    submit
                  </button>
                  </div>
                <Filter
                  size={this.state.products.length}
                  sort={this.state.sort}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Product
                  products={this.state.products}
                  addToCart={this.addToCart}
                />
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

export default connect(mapStateToProps, {
  getProducts,
  getCart,
  saveCart,
  deleteCart,
  getSearchResult,
})(Home);
