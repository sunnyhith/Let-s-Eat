import React from "react";
import { Link } from "react-router-dom";
import logo from 'assets/img/brand.png';

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const NavLogo = () => {
  const classes = usestyles();

  return (
    <Link to="/"
        className={classes.navLogo}
    >
        <img src={logo} alt="LET'S EAT" height="40"/>
    </Link>
  );
};

export default NavLogo;
