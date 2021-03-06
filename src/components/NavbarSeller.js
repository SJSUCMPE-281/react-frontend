import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarSeller.css";
import Pool from "../UserPool";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavbarSeller(props) {
  let history = useHistory();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      console.log("user exits");
      props.signout();
      user.signOut();
      localStorage.removeItem("cartItems");
    }
    history.push("/");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/sellerhome" className="navbar-logo" onClick={closeMobileMenu}>
          SaaS Shoppe
          <i class="fab fa-firstdraft" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
       
          <li className="nav-item">
            <Link
              to="/sellerhome/orders/ORDERED"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Open Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/sellerhome/orders/SHIPPED"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Closed Orders
            </Link>
          </li>
          
          <li className="nav-item">
            <Link
              to="/sellerhome/products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/sellerhome/addproduct/_add"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Add a Product
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/sellerhome/sellerprofile"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              My Profile
            </Link>
          </li>
        </ul>
        <Button variant="info" onClick={logout}>
          Logout
        </Button>
      </nav>
    </>
  );
}

export default NavbarSeller;
