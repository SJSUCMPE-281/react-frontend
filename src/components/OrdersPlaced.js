import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { getOrders } from "../actions/orderActions";
import Pool from "../UserPool";
import formatCurrency from "../util";

class OrdersPlaced extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      orderDetail: null,
      sale: null,
      address: "",
    };
    this.displayDetails = this.displayDetails.bind(this);
  }

  displayDetails(id) {
    let order = this.state.sales.filter((sale) => sale.orderId === id);
    console.log(order);
    console.log(this.state.sales);
  }

  async componentDidMount() {
    /* Axios to fetch all the purchases done by this buyer. Store the result in state-> sales array */
    const user = Pool.getCurrentUser();
    if (user) {
      let userId = user.getUsername();
      await this.props.getOrders(userId);
      this.setState({
        sales: this.props.orders.orders,
        address: JSON.stringify(this.props.orders.address),
      });
      console.log(this.state.address);
    }
  }
  openModal = (sale) => {
    console.log(sale);

    this.setState({ sale, orderDetail: sale.orderDetails });
  };

  closeModal = () => {
    this.setState({ orderDetail: null, sale: null });
  };
  renderDate(date) {
    let d = new Date(date);
    return <div>{d.toLocaleString()}</div>;
  }
  render() {
    console.log(this.props.orders);
    return (
      <div>
        {this.props.orders.orders.length === 0 ? (
          <h3 className="center">You haven't placed any orders yet!</h3>
        ) : (
          <Container>
            <h2 className="text-center">Orders</h2>
            <br></br>

            <div className="row">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Order Id</th>
                    <th> Shipping Address</th>
                    <th> Total Amount</th>
                    <th> Status</th>
                    <th> Tracking Id</th>
                    <th> Date</th>
                    <th> Details</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sales.map((sale) => (
                    <tr key={sale.orderId}>
                      <td> {sale.orderId}</td>
                      <td>
                        {" "}
                        {sale.address.street1} <br></br>
                        {sale.address.city} <br></br>
                        {sale.address.city}
                        <br></br>
                        {sale.address.zip}
                      </td>
                      <td> {formatCurrency(sale.totalAmount)}</td>
                      <td> {sale.status}</td>
                      <td> {sale.trackingId} </td>
                      <td>{this.renderDate(sale.updatedAt)}</td>
                      <td>
                        <button
                          onClick={() => this.openModal(sale)}
                          className="btn btn-danger"
                        >
                          Details{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        )}

        {this.state.orderDetail && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div>
                <Container>
                  <h2 className="text-center">Order Details</h2>
                  <br></br>
                  <div className="row">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th> Item</th>
                          <th> Quantity</th>
                          <th> Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orderDetail.map((order) => (
                          <tr key={order.product.productId}>
                            <td>
                              {" "}
                              <img
                                class="ordertable"
                                src={order.product.imageUrl}
                              ></img>{" "}
                              {order.product.productName}
                            </td>
                            <td> {order.quantity} </td>
                            <td> {formatCurrency(order.orderDetailAmount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="center">
                    Total Price: {formatCurrency(this.state.sale.totalPrice)}
                  </div>
                  <br />
                  <div className="center">
                    Tax Amount: {formatCurrency(this.state.sale.taxAmount)}
                  </div>
                  <br />
                  <div className="center">
                    Total Amount Paid:{" "}
                    {formatCurrency(this.state.sale.totalAmount)}
                  </div>
                </Container>
              </div>
            </Zoom>{" "}
          </Modal>
        )}
      </div>
    );
  }
}
function mapStateToProps({ orders }) {
  return { orders };
}
export default connect(mapStateToProps, { getOrders })(OrdersPlaced);
