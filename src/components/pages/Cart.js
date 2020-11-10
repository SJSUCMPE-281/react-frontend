import React, { Component } from 'react'
import formatCurrency from '../../util';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email: "",
            address: "",
            showCheckout: false
        }
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value
        })
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems

        }
        this.props.createOrder(order);
    }

     addTax(num) {
         let tax = num*5/100;
         let total = num+tax;
        return "$" + Number(total.toFixed(1)).toLocaleString() + " ";
      }
      computeTax(num) {
        let tax = num*5/100;
       return "$" + Number(tax.toFixed(1)).toLocaleString() + " ";
     }

      
    render() {
        const {cartItems} = this.props;
        return(
        <div>
                {cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is Empty!</div>
                )
                :
                (<div className="cart cart-header"> You have {cartItems.length} in the cart {" "}
                </div>
                )}

            <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                <div>{item.title}</div>
                                <div className="right">
                                {formatCurrency(item.price)} X {item.count}{" "}
                                <button onClick={()=>this.props.removeFromCart(item)}>
                                    Remove
                                </button>
                                </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                        </Fade>
                    </div>
                    {cartItems.length!==0 && (
                        <div>
                             <div className="center">
                                     Total : {" "}
                                     {
                                         formatCurrency(
                                             cartItems.reduce((a,c)=> a + c.price * c.count, 0)
                                         )
                                     }
                                 </div>
                                <br/>
                                 <div className="center">
                                     Tax (5%): {" "}
                                     {
                                         this.computeTax(
                                             cartItems.reduce((a,c)=> a + c.price * c.count, 0)
                                         )
                                     }
                                 </div>
                             <div className="cart"> 
                             <div className="total">
                                <div>
                                     Total : {" "}
                                     {
                                         this.addTax(
                                             cartItems.reduce((a,c)=> a + c.price * c.count, 0)
                                         )
                                     }
                                 </div>
                                     <button className="button primary" 
                                     onClick={()=> {
                                         this.setState({ showCheckout: true})
                                     }}>Checkout</button>
                             </div>
                             </div>
                             {this.state.showCheckout && (
                                 <Fade right cascade>
                                      <h3>Checkout</h3>
                                 <div className="cart">
                                    
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>E-mail</label>
                                            <input 
                                            name="email"
                                            type="email"
                                            required
                                            onChange={this.handleInput}>
                                                </input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input 
                                            name="name"
                                            type="text"
                                            required
                                            onChange={this.handleInput}>
                                                </input>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input 
                                            name="address"
                                            type="text"
                                            required
                                            onChange={this.handleInput}>
                                                </input>
                                        </li>
                                        <li>
                                            <button type="submit" className="button primary">Pay with Stripe</button>
                                        </li>

                                    </ul>
                                </form>
                                 </div>
                                 </Fade>
                             ) }
                             </div>
                    )}
                   
            </div>
          </div>
        )
}}
