import React, { Component } from "react";
import { connect } from "react-redux";
import { saveMedia, clearMedia } from "../actions/mediaActions";
import { getSeller } from "../actions/userActions";
import {
  saveSellerProduct,
  updateSellerProduct,
} from "../actions/sellerProductActions";
import Pool from "../UserPool";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getProduct } from "../actions/productActions";
import { withRouter } from "react-router-dom";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      _id: "",
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      categoryList: [
        "Fashion",
        "Food & Grocery",
        "Toys & Kids",
        "Electronics",
        "Books",
        "Home,Garden & Tools",
        "Pet Supplies",
        "Computers",
        "Beauty & Health",
        "Sports",
      ],

      id: this.props.match.params.id,
      userState: {},
    };
    console.log("id", this.state.id);
    this.changeProductTitleHandler = this.changeProductTitleHandler.bind(this);
    this.changeProductDescHandler = this.changeProductDescHandler.bind(this);
    this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
    this.changeProductCategoryHandler = this.changeProductCategoryHandler.bind(
      this
    );
    this.changeProductImageHandler = this.changeProductImageHandler.bind(this);
    this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
  }

  async componentDidMount() {
    const user = Pool.getCurrentUser();
    if (user) {
      const userId = user.getUsername();
      await this.props.getSeller(userId);
      this.setState({ userState: this.props.user.seller });
    }

    if (this.state.id === "_add") {
      return;
    } else {
      /* Fetch the products details from database with the product Id and set the state with the result set */
      console.log(this.state.id);
      // let product = data.products.filter(
      //   (product) => product._id === this.state.id
      // );
      // console.log(product);
      // this.setState({
      //   _id: product[0]._id,
      //   title: product[0].title,
      //   description: product[0].description,
      //   price: product[0].price,
      //   category: product[0].category,
      //   image: product[0].image,
      // });
      const userId = user.getUsername();
      const resp = await this.props.getProduct(userId, this.state.id);
      console.log(this.props.products);
      this.setState({
        _id: this.props.products.product.productId,
        title: this.props.products.product.productName,
        description: this.props.products.product.productDescription,
        price: this.props.products.product.price,
        category: this.props.products.product.category,
        image: this.props.products.files,
      });
    }
  }
  componentWillUnmount() {
    this.props.clearMedia();
  }
  saveOrUpdateProduct = (e) => {
    e.preventDefault();
    let product = {
      _id: this.state._id,
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      image: this.state.image,
    };

    console.log("product => " + JSON.stringify(product));

    // step 5
    if (this.state.id === "_add") {
      /* Add axios to save the new product here*/
      const { images } = this.props.images;
      const user = Pool.getCurrentUser();
      if (user) {
        const userId = user.getUsername();
        let newProduct = {
          productName: this.state.title,
          productDescription: this.state.description,
          price: this.state.price,
          category: this.state.category,
          sellerId: this.props.user.seller.sellerId,
          shopName: this.props.user.seller.shopName,
          mediaList: [...images],
        };
        console.log(newProduct);
        this.props.saveSellerProduct(userId, newProduct);
      }
    } else {
      /* Add axios to update the product here*/
      const { images } = this.props.images;
      const user = Pool.getCurrentUser();

      if (user) {
        const userId = user.getUsername();
        let updateProduct = this.props.products.product;
        updateProduct.productName = this.state.title;
        updateProduct.productDescription = this.state.description;
        updateProduct.price = this.state.price;
        updateProduct.category = this.state.category;
        if (images.length > 0) {
          updateProduct.mediaList = [...images];
        }
        this.props.updateSellerProduct(userId, updateProduct);
      }
    }
    this.props.history.push("/sellerhome");
    // window.location.pathname = "/sellerhome";
  };

  changeProductTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeProductDescHandler = (event) => {
    this.setState({ description: event.target.value });
  };
  changeProductPriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };
  changeProductCategoryHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  changeProductImageHandler = (event) => {
    this.setState({ image: event.target.value });
    const files = event.target.files;
    this.props.saveMedia(files);
  };

  cancel() {
    this.props.history.push("/sellerhome");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Product</h3>;
    } else {
      return <h3 className="text-center">Update Product</h3>;
    }
  }

  renderAlert() {
    if (this.props.images.images.length > 0) {
      return (
        <div class="alert alert-success" role="alert">
          Successfully uploaded {this.props.images.images.length} images!
        </div>
      );
    }
  }
  render() {
    console.log(this.props.images);
    console.log(this.props.user);
    return (
      <div>
        <br></br>
        {Object.keys(this.state.userState).length === 0 ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            {this.state.userState.shopName === null ? (
              <Container>
                <Link to="/sellerhome">
                  <Button variant="primary">
                    Please Register Your Shop to Add Your Products
                  </Button>
                </Link>
              </Container>
            ) : (
              <>
                <div className="container">
                  <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                      {this.getTitle()}
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label>Product Title </label>
                            <input
                              placeholder="Product Title"
                              name="productTitle"
                              className="form-control"
                              value={this.state.title}
                              onChange={this.changeProductTitleHandler}
                            />
                          </div>
                          <div className="form-group">
                            <label>Product Description </label>
                            <input
                              placeholder="Product Description"
                              name="productDescription"
                              className="form-control"
                              value={this.state.description}
                              onChange={this.changeProductDescHandler}
                            />
                          </div>
                          <div className="form-group">
                            <label> Product Price </label>
                            <input
                              placeholder="Product Price"
                              name="productPrice"
                              className="form-control"
                              value={this.state.price}
                              onChange={this.changeProductPriceHandler}
                            />
                          </div>
                          <div className="form-group">
                            <label> Category </label>
                            <select
                              name="category"
                              className="form-control"
                              onChange={this.changeProductCategoryHandler}
                            >
                              <option value="">
                                {" "}
                                Please choose a category{" "}
                              </option>
                              {this.state.categoryList.map((cat) => {
                                if (this.state.category === cat) {
                                  return (
                                    <option value={cat} selected="selected">
                                      {" "}
                                      {cat}{" "}
                                    </option>
                                  );
                                } else {
                                  return <option value={cat}> {cat} </option>;
                                }
                              })}
                            </select>
                          </div>
                          <div className="form-group upload-steps">
                            <label> Image </label>
                            <input
                              name="url"
                              type="file"
                              multiple
                              ref={this.fileInput}
                              className="form-control"
                              value={this.state.image}
                              onChange={this.changeProductImageHandler}
                            />
                          </div>
                          {this.renderAlert()}

                          <button
                            className="btn btn-success"
                            onClick={this.saveOrUpdateProduct}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={this.cancel.bind(this)}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
function mapStateToProps({ images, user, products }) {
  return { images, user, products };
}

export default connect(mapStateToProps, {
  saveMedia,
  getSeller,
  getProduct,
  updateSellerProduct,
  saveSellerProduct,
  clearMedia,
})(CreateProduct);
