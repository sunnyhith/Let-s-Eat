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

const SignedOut = () => {
  const classes = usestyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/signin"
          color="info"
          className={classes.registerNavLink}
          round
        >
          Login
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/signup"
          color="rose"
          className={classes.registerNavLink}
          round
        >
          Sign Up Now
        </Button>
      </ListItem>
    </List>
  );
};

export default SignedOut;
