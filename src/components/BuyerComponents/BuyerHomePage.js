import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrdersPlaced from "../../components/OrdersPlaced";
import CustomerProfile from "../../components/CustomerProfile";
import ShopView from '../../components/ShopView';
import ContactUs from "../../components/pages/ContactUs";
import Home from "../../components/pages/Home";
import Navbar from '../../components/Navbar';
class BuyerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
         <Navbar />
        <Switch>
        <Route path="/buyerhome" exact component={Home} />
        <Route path="/buyerhome/contact-us"  component={ContactUs} />
        <Route path="/buyerhome/shopview/:id"  component={ShopView} />
        <Route path="/buyerhome/myprofile"  component={CustomerProfile} />
        <Route path="/buyerhome/orders"  component={OrdersPlaced} />
        </Switch>
      </>
    );
  }
}

export default BuyerHomePage;
