import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Search from './components/pages/Search';
import Food from './components/pages/Food';
import Clothes from './components/pages/Clothes';
import Accessories from './components/pages/Accessories';
import Shoes from './components/pages/Shoes';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/products' component={Products} />
        <Route path='/search' component={Search} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/food' component={Food} />
        <Route path='/clothes' component={Clothes} />
        <Route path='/accessories' component={Accessories} />
        <Route path='/shoes' component={Shoes} />
      </Switch>
    </Router>
  );
}

export default App;
