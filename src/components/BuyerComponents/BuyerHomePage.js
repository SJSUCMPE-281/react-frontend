import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrdersPlaced from "../../components/OrdersPlaced";
import CustomerProfile from "../../components/CustomerProfile";
import ShopView from "../../components/ShopView";
import ContactUs from "../../components/pages/ContactUs";
import Home from "../../components/pages/Home";
import Navbar from "../../components/Navbar";
import { CognitoAuth } from "amazon-cognito-auth-js";
import auth_details_buyer from "../../auth_details_buyer";
import Pool from "../../UserPool";
import { saveBuyer } from "../../actions/userActions";
import { connect } from "react-redux";

class BuyerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  async componentDidMount() {
    const loggedIn = Pool.getCurrentUser();
    if (loggedIn === null) {
      this.props.history.push("/");
    }
    await new Promise((resolve, reject) => {
      var authDetails = new CognitoAuth(auth_details_buyer);
      console.log(authDetails);
      this.setState({ auth: authDetails });
      console.log(this.state);
      console.log(authDetails);
      console.log(authDetails.getCurrentUser());
      var curUrl = window.location.href;
      console.log(authDetails.parseCognitoWebResponse(curUrl));
      authDetails.userhandler = {
        onSuccess: function (result) {
          console.log("handler success");
          const user = Pool.getCurrentUser();
          console.log(this.props);
          if (user) {
            user.getSession((err, session) => {
              if (!err) {
                console.log(session);
                let email = session.getIdToken().payload["email"];
                let firstname = session.getIdToken().payload[
                  "custom:firstName"
                ];
                let lastname = session.getIdToken().payload["custom:lastName"];
                let id = session.getIdToken().payload["cognito:username"];
                console.log(email, firstname, lastname, id);
                resolve(session);
              }
            });
          } else {
            console.log("no user");
          }
        },
        onFailure: function (err) {
          console.log("handler failure");
          reject("err");
        },
      };
      console.log(this.props);
    });

    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (!err) {
          let email = session.getIdToken().payload["email"];
          let firstname = session.getIdToken().payload["custom:firstName"];
          let lastname = session.getIdToken().payload["custom:lastName"];
          let id = session.getIdToken().payload["cognito:username"];
          console.log(email, firstname, lastname, id);
          const buyer = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: "",
            buyerId: id,
          };
          console.log(buyer);
          this.props.saveBuyer(buyer);
        }
      });
    }
  }

  logout = () => {
    this.state.auth.signOut();
  };
  render() {
    return (
      <>
        <Navbar
          signout={() => {
            this.logout();
          }}
        />
        <Switch>
          <Route path="/buyerhome" exact component={Home} />
          <Route path="/buyerhome/contact-us" component={ContactUs} />
          <Route path="/buyerhome/shopview/:id" component={ShopView} />
          <Route path="/buyerhome/myprofile" component={CustomerProfile} />
          <Route path="/buyerhome/orders" component={OrdersPlaced} />
        </Switch>
      </>
    );
  }
}

export default connect(null, { saveBuyer })(BuyerHomePage);
