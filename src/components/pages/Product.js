import React, { Component } from 'react';
import formatCurrency from '../../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import ReactStars from "react-rating-stars-component";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel'

export default class Product extends Component {
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
                          <img src={product.image[0].link} alt={product.title}></img>
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
                      <button onClick={() =>this.props.addToCart(product)} className="button primary">Add To Cart</button>
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
                         <div className="carouselWidth">
                     <Carousel>
                     {product.image.map((pic,index) => (
                        <Carousel.Item key={index}>
                        <img
                        className="d-block w-100"
                        src={pic.link}
                        alt=""
                        />
                        </Carousel.Item>
                    ))}
                    </Carousel>
                    </div>    
                         <div className="product-details-description">
                             <p>
                              <strong>{product.title}</strong>
                              </p>
                              <p>{product.description}</p>
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
                                  <button className="button primary"
                                  onClick={()=>{
                                      this.props.addToCart(product);
                                      this.closeModal();
                                  }}>Add To Cart</button>
                              </div>
                              <hr />
                              <h1 className="center">Reviews</h1>
                              <hr />
                              {product.reviews.length === 0 ? (
                <div >No one has reviewed the prodcut yet!</div>
                )
                :
                (
                    <ListGroup >
                              {product.reviews.map((review,index) => (
                                  
                                   <ListGroup.Item key={index}><h2>{review.name}</h2><ReactStars
                                   count={5}
                                   size={20}
                                   edit = {false}
                                   color= "gray"
                                   activeColor= "yellow"
                                   value={review.rating}
                                   
                               /><Alert variant="dark">
                                       {review.review}
                                   </Alert></ListGroup.Item>
              ))}
                </ListGroup>
                )} 
                          </div>
                     </div>
                  </Zoom> </Modal>}
          </div>
      )
  }
}
