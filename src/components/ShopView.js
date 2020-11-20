import React, { Component } from "react";
import data from "../data.json";
import Navbar from "./Navbar";
import { getSeller } from "../actions/userActions";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Fade from "react-reveal/Fade";
import ShopProducts from './ShopProducts';
class ShopView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      userState:{},
      id: this.props.match.params.id
    };
    console.log("id", this.state.id);
  }
  async componentDidMount() {
      const id = this.state.id;
      const response = await this.props.getSeller(id);
      this.setState({ userState: this.props.user.seller });
      console.log(this.state.userState)
  }


  render() {
    return (
      <>
        <Navbar />
        <img className="banner" src="../images/banner1.jpg" alt=""/>
        <Fade bottom cascade>
        <Container>
          <br />
        <h1>{this.state.userState.shopName} </h1>
        <div>
          <div className="leftDiv">
          <p>{this.state.userState.shopDescription} </p>
          </div>
          <div className="rightDiv">
            <h2>  {this.state.userState.firstName}{" "}{this.state.userState.lastName}</h2>
            <p className="gray">Shop Owner</p>
            <p>Contact : {this.state.userState.phoneNumber}</p>
            <p>E-mail : {this.state.userState.email}</p>
          </div>
          </div>
        </Container>
        </Fade>
        <div className="grid-container">
          <main>
        
            <div className="content">
              
              <div className="main">
                <ShopProducts sellerShopId={this.state.id}
                >
                  {" "}
                </ShopProducts>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}
function mapStateToProps({user}) {
  return {user};
}
export default connect(mapStateToProps, {
  getSeller
})(ShopView);

