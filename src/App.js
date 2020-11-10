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
import SellerHomePage from './components/SellerHomePage';

function App() {
  return (
    <Router>
       <Account>
    
      <Switch>
        <Route path='/' exact component={CustomerLogin} />
        <Route path='/admin' component={AdminLogin} />
        <Route path='/seller' component={SellerLogin} />

        <Route path='/home' exact component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/contact-us' component={ContactUs} />

        <Route path='/sellerhome' component={SellerHomePage} />
      </Switch>
      </Account>
    </Router>
  );
}

export default App;
