import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";

import { signOut } from 'components/auth/authUtil.js';

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const SignedIn = () => {
  const classes = usestyles();
  
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/survey"
          color="transparent"
          className={classes.navLink}
        >
          Survey
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/create"
          color="transparent"
          className={classes.navLink}
        >
          Create Event
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/preferences"
          color="transparent"
          className={classes.navLink}
        >
          Preferences
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          component={ Link } to="/"
          color="transparent"
          className={classes.navLink}
          onClick={signOut}
        >
          Logout
        </Button>
      </ListItem>
    </List>
  );
};

export default SignedIn;
