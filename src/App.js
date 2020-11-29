import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomerLogin from "./components/CustomerLogin";
import AdminLogin from "./components/AdminLogin";
import SellerLogin from "./components/SellerLogin";
import { Account } from "./components/Accounts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import MainHome from "./components/MainHome";
import BuyerHomePage from "./components/BuyerComponents/BuyerHomePage";
import SellerHomePage from './components/SellerComponents/SellerHomePage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Account>
          <Switch>
            <Route path="/" exact component={MainHome} />
            <Route path="/customer"  component={CustomerLogin} />
            <Route path="/admin" component={AdminLogin} />
            <Route path="/seller" component={SellerLogin} />
            <Route path="/buyerhome"  component={BuyerHomePage} />           
            <Route path="/sellerhome" component={SellerHomePage} />
          </Switch>
        </Account>
      </Router>
    </Provider>
  );
}
export default App;
