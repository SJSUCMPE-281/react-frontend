import React, { Component } from 'react'
import NavbarSeller from './NavbarSeller';
import data from '../data.json';

class CreateProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
          
            _id: '',
            title:'',
            description:'',
            price:'',
            category:'',
            image:'',


           id: this.props.match.params.id
        }
        console.log("id",this.state.id);
        this.changeProductIdHandler = this.changeProductIdHandler.bind(this);
        this.changeProductTitleHandler = this.changeProductTitleHandler.bind(this);
        this.changeProductDescHandler = this.changeProductDescHandler.bind(this);
        this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
        this.changeProductCategoryHandler = this.changeProductCategoryHandler.bind(this);
        this.changeProductImageHandler = this.changeProductImageHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }
            
        componentDidMount(){

          
            if(this.state.id === '_add'){
                return
            }else{

                /* Fetch the products details from database with the product Id and set the state with the result set */
               

                let product = data.products.filter((product) => product._id === this.state.id);
                console.log(product);
                this.setState({
                    _id: product[0]._id,
                    title:product[0].title,
                    description:product[0].description,
                    price:product[0].price,
                    category:product[0].category,
                    image:product[0].image,

                })
            }        
        }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {
            _id: this.state._id,
            title:this.state.title,
            description:this.state.description,
            price:this.state.price,
            category:this.state.category,
            image:this.state.image,
        }
      
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.id === '_add'){
               /* Add axios to save the new product here*/
               this.props.history.push('/listproducts');
        }else{
                /* Add axios to update the product here*/
                this.props.history.push('/listproducts');
        }

    }
    
    changeProductIdHandler= (event) => {
        this.setState({_id: event.target.value});
    }
    changeProductTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }
    changeProductDescHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeProductPriceHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changeProductCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeProductImageHandler= (event) => {
        this.setState({image: event.target.value});
    }

    cancel(){
        this.props.history.push('/listproducts');
    }

    getTitle(){
    
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
       
    }
    render() {
        return (
            <div>
                  <NavbarSeller />
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Product Id </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state._id} onChange={this.changeProductIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Product Title </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.title} onChange={this.changeProductTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Product Description </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.description} onChange={this.changeProductDescHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Product Price </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.price} onChange={this.changeProductPriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Category </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.category} onChange={this.changeProductCategoryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Image </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.image} onChange={this.changeProductImageHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProduct
