import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarSeller from "../../components/NavbarSeller";
import Orders from "../../components/Orders";
import SellerProfile from "../../components/SellerProfile";
import CreateProduct from "../../components/CreateProduct";
import ListProducts from "../../components/ListProducts";
import { CognitoAuth } from "amazon-cognito-auth-js";
import auth_details_seller from "../../auth_details_seller";
import Pool from "../../UserPool";
import SellerHome from "./SellerHome";
import { saveSeller } from "../../actions/userActions";
import { connect } from "react-redux";
class SellerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
    console.log(props);
  }
  async componentDidMount() {
    const loggedIn = Pool.getCurrentUser();
    if (loggedIn === null) {
      this.props.history.push("/");
    }
    await new Promise((resolve, reject) => {
      var authDetails = new CognitoAuth(auth_details_seller);
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
          const seller = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: null,
            sellerId: id,
          };
          console.log(seller);
          this.props.saveSeller(seller);
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
        <NavbarSeller
          signout={() => {
            this.logout();
          }}
        />
        <Switch>
          <Route path="/sellerhome" exact component={SellerHome} />
          <Route path="/sellerhome/products" exact component={ListProducts} />
          <Route path="/sellerhome/orders/:id" component={Orders} />
          <Route path="/sellerhome/addproduct/:id" component={CreateProduct} />
          <Route path="/sellerhome/sellerprofile" component={SellerProfile} />
        </Switch>
      </>
    );
  }
}
export default connect(null, { saveSeller })(SellerHomePage);
