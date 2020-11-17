import React, { Component } from 'react'
import formatCurrency from '../../util';
import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux'
import {getCart,saveCart, deleteCart} from '../../actions/cartActions'
import Pool from '../../UserPool'

class Cart extends Component {
    componentDidMount(){
        const user = Pool.getCurrentUser();
        if(user){
          this.props.getCart(user.getUsername())
        }
      }
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email: "",
            address: "",
            showCheckout: false,
            orderDetails:[]
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
     removeFromCart = (item) => {
         let cart = {};
        const user = Pool.getCurrentUser();
        if(user){
            const id = user.getUsername();
            console.log(item)
            const cartItems = this.state.orderDetails.slice();
            console.log("cartItems",cartItems)
            let order = cartItems.filter(x=>x.product.productId === item.product.productId)
            if(order[0].quantity > 1 && cartItems.length >= 1){
                order[0].quantity--;
                cart = {
                    buyerId:id,
                    orderDetails:[...this.state.orderDetails]
                }
                this.props.saveCart(id,cart);
            }else if(cartItems.length > 1){
                let newOrder = cartItems.filter(x=>x.product.productId !== item.product.productId)
                console.log("newOrder",newOrder)
                cart = {
                    buyerId:id,
                    orderDetails:[...newOrder]
                }
                console.log(cart);
                this.props.saveCart(id,cart);
            }else{
                this.props.deleteCart(id)
            }
        }
      }
      componentWillReceiveProps(nextProps){
          const {cart} = nextProps
          this.setState({orderDetails:cart})
      }
    renderCart(){
        if(!this.props.cart){
            return (
                <div className="cart cart-header">Cart is Empty!</div>
            )
        }else{
            return(
                <div>
                <div className="cart cart-header"> You have {this.props.cart.length} in the cart {" "} </div>
                <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {this.props.cart.map(item => (
                            <li key={item.product.productId}>
                                <div>
                                    <img src={item.product.imageUrl} alt={item.product.productName}></img>
                                </div>
                                <div>
                                <div>{item.product.productName}</div>
                                <div className="right">
                                {formatCurrency(item.product.price)} X {item.quantity}{" "}
                                <button onClick={()=>this.removeFromCart(item)}>
                                    Remove
                                </button>
                                </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                        </Fade>
                    </div>
                    {this.props.cart && (
                        <div>
                             <div className="center">
                                     Total : {" "}
                                      {
                                         formatCurrency(
                                            this.props.cart.reduce((a,c)=> a + c.product.price * c.quantity, 0)
                                         )
                                      }
                                 </div>
                                <br/>
                                 <div className="center">
                                     Tax (5%): {" "}
                                     {
                                         this.computeTax(
                                            this.props.cart.reduce((a,c)=> a + c.product.price * c.quantity, 0)
                                         )
                                     }
                                 </div>
                             <div className="cart"> 
                             <div className="total">
                                <div>
                                     Total : {" "}
                                     {
                                         this.addTax(
                                            this.props.cart.reduce((a,c)=> a + c.product.price * c.quantity, 0)
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
        }
    }
    render() {
        const {cartItems} = this.props;
        return(
        <div>
            {this.renderCart()}
          </div>
        )
}}
function mapStateToProps({cart}){
    return {cart}
}
export default connect(mapStateToProps,{getCart,saveCart, deleteCart})(Cart)