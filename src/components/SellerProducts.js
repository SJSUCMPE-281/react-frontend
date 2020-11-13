import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import ReactStars from "react-rating-stars-component";

export default class SellerProducts extends Component {
  constructor(props){
      super(props);
      this.state={
          product:null,
          rating:null
      }
  }
  openModal = (product) => {
      this.setState({product}) ;
  }
 
  closeModal = () => {
      this.setState({product:null}) ;
  }
  
  render() {
      const {product} = this.state;
      return (
          <div>
              <Fade bottom cascade>
              <ul className="products">
              {this.props.products.map(product => (
                  <li key={product._id}>
                      <div className="product">
                      <a href={"#" + product._id} onClick={()=> this.openModal(product)}>
                          <img src={product.image} alt={product.title}></img>
                          <p>{product.title}</p>
                        
                      </a>
                      <span>
                     <span className="widthhalf">
                     <ReactStars
                              count={5}
                              size={20}
                              edit = {false}
                              color= "gray"
                              activeColor= "yellow"
                              value={product.rating}
                              
                          /></span>(2)</span>
                     
                      <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button className="button primary" onClick={() =>this.props.editProduct(product)}>Edit</button>
                      <button className="button primary" onClick={() =>this.props.deleteProduct(product)}>Delete</button>
                      </div>
                      </div>
                      </li>
              ))}
              </ul>
              </Fade>
              {product && <Modal isOpen={true} onRequestClose={this.closeModal}>
                 <Zoom>
                     <button className="close-modal" onClick={this.closeModal}>x</button>
                     <div className="product-details">
                         <img src={product.image} alt={product.title}></img>
                         <div className="product-details-description">
                             <p>
                              <strong>{product.title}</strong>
                              </p>
                              <p>{product.description}</p>
                              <div className="product-price">
                                  <div>{formatCurrency(product.price)}</div>
                                  <button className="button primary"
                                  onClick={()=>{
                                    this.props.editProduct(product);
                                    this.closeModal();
                                }}
                                >Edit</button>
                                <button className="button primary"
                                  onClick={()=>{
                                    this.props.deleteProduct(product);
                                    this.closeModal();
                                }}
                                >Delete</button>
                              </div>
                          </div>
                     </div>
                  </Zoom> </Modal>}
          </div>
      )
  }
}
