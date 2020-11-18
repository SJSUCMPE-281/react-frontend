import React, { Component } from "react";
import data from "../data.json";
import NavbarSeller from "./NavbarSeller";
import SellerProducts from "./SellerProducts";

class ListProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
    };
  }

  componentDidMount() {
    /*Axios to fetch the products of this seller should come here. Store the result in the state */
  }

  editProduct = (product) => {
    this.props.history.push(`/addproduct/${product._id}`);
  };

  deleteProduct = (product) => {
    /*axios to delete the product by passing the product Id and also update the state with remaining products */
    this.setState({
      products: this.state.products.filter((prod) => prod._id !== product._id),
    });
  };

  render() {
    return (
      <>
        <NavbarSeller />
        <div className="grid-container">
          <main>
            <div className="content">
              <div className="main">
                <SellerProducts
                  editProduct={this.editProduct}
                  deleteProduct={this.deleteProduct}
                >
                  {" "}
                </SellerProducts>
              </div>
              <div className="sidebar"></div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default ListProducts;
