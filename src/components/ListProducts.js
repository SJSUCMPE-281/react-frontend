import React, { Component } from "react";
import data from "../data.json";
import NavbarSeller from "./NavbarSeller";
import SellerProducts from "./SellerProducts";
import { getSeller } from "../actions/userActions";
import Pool from "../UserPool";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Fade from "react-reveal/Fade";

class ListProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      userState: {},
    };
  }
  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      const id = user.getUsername();
      const response = await this.props.getSeller(id);
      console.log()
      this.setState({ userState: this.props.user.seller });
    }
  }
  deleteProduct = (product) => {
    /*axios to delete the product by passing the product Id and also update the state with remaining products */
    this.setState({
      products: this.state.products.filter((prod) => prod._id !== product._id),
    });
  };

  render() {
    console.log(this.props.user);
    console.log(this.state.userState);
    return (
      <>
        <NavbarSeller />
        {Object.keys(this.state.userState).length === 0 ?
          <i className="fa fa-spinner fa-spin"></i> : <>
          {this.state.userState.shopName === null ? null :
            (<> 
            {this.state.userState.mediaList.length === 0 ? null : 
            <img className="banner" src={this.props.user.seller.mediaList[0].url} />}
             <Fade bottom cascade>
               <Container>
                 <br />
                 <h1>{this.state.userState.shopName} </h1>
                 <div>
                   <div className="leftDiv">
                     <p>{this.state.userState.shopDescription} </p>
                   </div>
                   <div className="rightDiv">
                     <h2>
                       {" "}
                       {this.state.userState.firstName}{" "}
                       {this.state.userState.lastName}
                     </h2>
                     <p className="gray">Shop Owner</p>
                     <p>Contact : {this.state.userState.phoneNumber}</p>
                     <p>E-mail : {this.state.userState.email}</p>
                   </div>
                 </div>
               </Container>
             </Fade></>)
        }
          </>
      }
        
       
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
            </div>
          </main>
        </div>
      </>
    );
  }
}
function mapStateToProps({ user }) {
  return { user };
}
export default connect(mapStateToProps, {
  getSeller,
})(ListProducts);
