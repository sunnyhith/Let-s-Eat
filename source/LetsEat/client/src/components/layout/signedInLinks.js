import React from "react";
import { NavLink } from "react-router-dom";

const SignedIn = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/survey">Survey</NavLink>
      </li>
      <li>
        <NavLink to="/create">Create Event</NavLink>
      </li>
      <li>
        <NavLink to="/preferences">Preferences</NavLink>
      </li>
      <li>
        <NavLink to="/">Logout</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating red lighten-1">
          SK
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedIn;
