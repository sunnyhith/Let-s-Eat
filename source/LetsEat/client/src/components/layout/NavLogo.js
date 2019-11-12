import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";

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
