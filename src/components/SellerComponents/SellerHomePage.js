import React, { Component } from "react";
import {Switch, Route } from "react-router-dom";
import NavbarSeller from '../../components/NavbarSeller';
import Orders from "../../components/Orders";
import SellerProfile from "../../components/SellerProfile";
import CreateProduct from "../../components/CreateProduct";
import ListProducts from "../../components/ListProducts";
class SellerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <>
        <NavbarSeller />
        <Switch>
        <Route path="/sellerhome" exact component={ListProducts} />
        <Route path="/sellerhome/orders/:id"  component={Orders} />
        <Route path="/sellerhome/addproduct/:id"  component={CreateProduct} />
        <Route path="/sellerhome/sellerprofile"  component={SellerProfile} />
        </Switch>
      </>
    );
  }
}
export default SellerHomePage;
