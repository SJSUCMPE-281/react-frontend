import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { connect } from "react-redux";
import { saveOrder } from "../../actions/orderActions";
import { deleteCart } from "../../actions/cartActions";
import Pool from "../../UserPool";

class StripeButton extends Component {
  onToken = (stripePrice, cart) => (token) => {
    console.log(token);
    axios
      .post(process.env.REACT_APP_PAYMENT_URL + "/api/payment", {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log(response.data);
        const { billing_details } = response.data;
        alert("payment success");
        const newSale = {
          orderDetails: [...cart.orderDetails],
          address: {
            street1: billing_details.address.line1,
            street2: billing_details.address.line2,
            city: billing_details.address.city,
            state: billing_details.address.state,
            zip: billing_details.address.postal_code,
          },
          status: "ORDERED",
          totalPrice: cart.totalPrice,
          taxAmount: cart.taxAmount,
          totalAmount: cart.totalAmount,
          sellerId: cart.orderDetails[0].product.sellerId,
          buyer: {
            buyerId: cart.buyerId,
          },
        };
        console.log(newSale);
        this.props.saveOrder(newSale, cart.buyerId);
        const user = Pool.getCurrentUser();
        if (user) {
          let userId = user.getUsername();
          this.props.deleteCart(userId);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
      });
  };
  render() {
    const { cart } = this.props;
    const stripePrice = cart.totalAmount * 100;
    return (
      <StripeCheckout
        amount={stripePrice}
        billingAddress
        label="Checkout"
        name="Saas Shoppe"
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is ${cart.totalAmount}`}
        panelLabel="Pay Now"
        token={this.onToken(stripePrice, cart)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency="USD"
      />
    );
  }
}

export default connect(null, { saveOrder, deleteCart })(StripeButton);
