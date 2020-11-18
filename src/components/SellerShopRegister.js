import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class SellerShopRegister extends Component {
  constructor(props) {
    super(props)
    this.imagesInput = React.createRef();
    this.state = {
      showRegisterModal:false,
      shopname:'',
      shopdescription:'',
      image:''
    }
    this.registerShop = this.registerShop.bind(this);
    this.confirmRegistration = this.confirmRegistration.bind(this);
    this.changeProductImageHandler = this.changeProductImageHandler.bind(this);
}
registerShop(){
  this.setState({showRegisterModal:true});
}
confirmRegistration(){

  this.setState({showRegisterModal:false});
  console.log(this.state);
      /*Axios to save the shop name and shop description to database 
  Pass Shop name and Shop description available in state attributes to the API.*/

}
changeProductImageHandler = (event) => {
  this.setState({ image: event.target.value });
  const files = event.target.files;
    console.log(files);
};
closeModal = () => {
  this.setState({showRegisterModal:false})
}
  render() {
    return (
      <div className="profile-details">
                 <Button variant="success"  onClick={this.registerShop}>
                    REGISTER YOUR SHOP
                  </Button>
                  
{this.state.showRegisterModal && <Modal isOpen={true} onRequestClose={this.closeModal}>
       <Zoom>
           <button className="close-modal" onClick={this.closeModal}>x</button>
           <h2 className="center">REGISTER YOUR SHOP</h2>

           <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Register Your Shop</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Shop Name</label>
                    <input
                      required
                      placeholder="Shop Name"
                      name="shopName"
                      className="form-control"
                      value={this.state.shopname}
                      onChange={event => this.setState({shopname:event.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Shop Description </label>
                    <input
                      required
                      placeholder="Shop Description"
                      name="shopDescription"
                      className="form-control"
                      value={this.state.shopdescription}
                      onChange={event => this.setState({shopdescription:event.target.value})} 
                    />
                  </div>
                  <div className="form-group upload-steps">
                    <label> Image </label>
                    <input
                      required
                      name="url"
                      type="file"
                      multiple
                      ref={this.imagesInput}
                      className="form-control"
                      value={this.state.image}
                      onChange={this.changeProductImageHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.confirmRegistration}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.closeModal}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </Zoom> </Modal>}
      </div>
      )
  }
}

export default SellerShopRegister;
