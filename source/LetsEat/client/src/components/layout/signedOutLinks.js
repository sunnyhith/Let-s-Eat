import React from "react";
import { NavLink } from "react-router-dom";

const SignedOut = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
    </ul>
  );
};

export default SignedOut;
