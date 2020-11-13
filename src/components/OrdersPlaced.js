import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class OrdersPlaced extends Component {
    constructor(props) {
        super(props)

        this.state = {
                sales: [],
                orderDetail: null,
                sale:null
        }
        this.displayDetails = this.displayDetails.bind(this);
    }

    displayDetails(id){

 
           let order=  this.state.sales.filter(sale => sale.orderId === id);
           console.log(order);
           console.log(this.state.sales);
        
    }


    componentDidMount(){
/* Axios to fetch all the purchases done by this buyer. Store the result in state-> sales array */
    }
    openModal = (sale) => {
        console.log(sale);
        this.setState({sale,orderDetail:sale.orderDetails});
    }
   
    closeModal = () => {
        this.setState({orderDetail:null,sale:null}) ;
    }

    render() {
        return (
            <div>
                   {this.state.sales.length === 0 ? (
                <h3 className="center">You haven't placed any orders yet!</h3>
                )
                :
                (
                    <Container>
                 <h2 className="text-center">Orders</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
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
                                {
                                    this.state.sales.map(                                  
                                        sale => 
                                        <tr key = {sale.orderId}>
                                             <td> {sale.orderId}</td>
                                             <td> {sale.address} </td>   
                                             <td> {sale.totalAmount}</td>
                                             <td> {sale.status}</td>
                                             <td> {sale.trackingId} </td>                                       
                                             <td> {sale.updatedAt}</td>
                                             <td>
                                                 <button onClick={()=> this.openModal(sale)} className="btn btn-danger">Details </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                </Container>
                )}
                
                {this.state.orderDetail && <Modal isOpen={true} onRequestClose={this.closeModal}>
                 <Zoom>
                     <button className="close-modal" onClick={this.closeModal}>X</button>
                     <div >
                     <Container>
                 <h2 className="text-center">Order Details</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Item</th>
                                    <th> Quantity</th>
                                    <th> Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderDetail.map(                                  
                                        order => 
                                        <tr key = {order.product}>
                                             <td> {order.product}</td>
                                             <td> {order.quantity} </td>   
                                             <td> {order.orderDetailAmount}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 <div className = "center">
                                Total Price: {this.state.sale.totalPrice}
                 </div>
                 <br />
                 <div className = "center">
                                Tax Amount: {this.state.sale.taxAmount}
                 </div>
                 <br />
                 <div className = "center">
                                Total Amount Paid: {this.state.sale.totalAmount}
                 </div>
                </Container>
                     
                     </div>
                  </Zoom> </Modal>}
            </div>
        )
    }
}

export default OrdersPlaced