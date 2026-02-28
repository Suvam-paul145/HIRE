import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HIRE</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li className="apply-link"><Link to="/onboarding">Apply</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
