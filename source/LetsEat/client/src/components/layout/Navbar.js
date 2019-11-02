import React from "react";
import { Link } from "react-router-dom";
import SignedIn from "./signedInLinks";
import SignedOut from "./signedOutLinks";
import Survey from "../preferences/Survey";

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Let's Eat!
        </Link>
        <SignedIn />
        <SignedOut />
      </div>
    </nav>
  );
};

export default Navbar;
