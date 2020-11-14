
import NavbarSeller from './NavbarSeller';
import React, { Component } from 'react';
import data from '../data.json';

class SellerProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
  }

  componentDidMount() {


    let seller = data.sellerProfile.filter((seller) => seller.userId === "simpsons");
    console.log(seller);
    this.setState({
      userId: seller[0].userId,
      firstName: seller[0].firstName,
      lastName: seller[0].lastName,
      email: seller[0].email,
      address: seller[0].address
    })
  }
  render() {

    return (

      <div>
        <NavbarSeller />
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Welcome {this.state.firstName}</h3>
              
              <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> UserID: {this.state.userId} </label>
                                        </div>
                                        <div className = "form-group">
                                            <label> First Name: {this.state.firstName} </label>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: {this.state.lastName} </label>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: {this.state.address} </label>
                                        </div>
                                        </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}



export default SellerProfile;