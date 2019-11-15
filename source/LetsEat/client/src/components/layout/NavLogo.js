import React from "react";
import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const NavLogo = () => {
  const classes = usestyles();

  return (
    <Link to="/"
        className={classes.navLogo}
    >
        Let's Eat ! 
    </Link>
  );
};

export default NavLogo;
