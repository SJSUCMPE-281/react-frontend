import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({ price }) => {
  const publishableKey = "";
  const stripePrice = price * 100;

  const onToken = (token) => {
    console.log(token);
    axios
      .post("http://localhost:8090/payment", {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log(response);
        alert("payment success");
      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
      });
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      name="Wolf Elite"
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="INR"
    />
  );
};

export default StripeButton;