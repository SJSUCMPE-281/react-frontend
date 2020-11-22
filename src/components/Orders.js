import React, { Component } from "react";
import CompletedOrders from "./CompletedOrders";
import OpenOrders from "./OpenOrders";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }
  render() {
    return (
      <div>
        {this.props.match.params.id === "ORDERED" ? (
          <OpenOrders />
        ) : (
          <CompletedOrders />
        )}
      </div>
    );
  }
}

export default Orders;
