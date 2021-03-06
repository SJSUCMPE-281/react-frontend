import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Pool from "../UserPool";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Navbar(props) {
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
        <Link to="/buyerhome" className="navbar-logo" onClick={closeMobileMenu}>
          SaaS Shoppe
          <i class="fab fa-firstdraft" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/buyerhome" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/buyerhome/contact-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/buyerhome/myProfile"
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

export default Navbar;
