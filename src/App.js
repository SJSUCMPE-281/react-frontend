import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactUs from './components/pages/ContactUs';
import Search from './components/pages/Search';
import CustomerLogin from './components/CustomerLogin';
import AdminLogin from './components/AdminLogin';
import SellerLogin from './components/SellerLogin';
import { Account } from './components/Accounts';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store";
import SellerProfile from './components/SellerProfile';
import CreateProduct from './components/CreateProduct';
import ListProducts from './components/ListProducts';

function App() {
  return (
    <Provider store={store}>
    <Router>
       <Account>
    
      <Switch>
        <Route path='/' exact component={CustomerLogin} />
        <Route path='/admin' component={AdminLogin} />
        <Route path='/seller' component={SellerLogin} />

        <Route path='/home' exact component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/contact-us' component={ContactUs} />

        <Route path='/sellerhome' component={ListProducts} />
        <Route path = "/listproducts" exact component = {ListProducts}></Route>
        <Route path = "/addproduct/:id" exact component = {CreateProduct}></Route>
        <Route path = "/sellerprofile" exact component = {SellerProfile}></Route>

      </Switch>
      </Account>
    </Router>
    </Provider>
  );
}

export default App;
