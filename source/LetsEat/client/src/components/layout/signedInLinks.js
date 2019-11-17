import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";

import firebaseConfig from "config/firebaseConfig";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const SignedIn = () => {
  const classes = usestyles();

  const signOut = () => {
    var user = firebaseConfig.auth().currentUser;
    if (user) {
      firebaseConfig
        .auth()
        .signOut()
        .then(function() {
          window.alert("Successfully signed out " + user.displayName);
        })
        .catch(function(error) {
          console.log(
            "Failed to signed out. " +
              "errorCode: " +
              error.code +
              " errorMessage: " +
              error.message
          );
        });
    } else {
      window.alert("User is not signed in.");
    }
  };

  return (
    <div>
      <List className={classes.list}>
        {/* <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/survey"
            color="transparent"
            className={classes.navLink}
          >
            Survey
          </Button>
        </ListItem> */}
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/create"
            color="transparent"
            className={classes.navLink}
          >
            Create Event
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            component={Link}
            to="/preferences"
            color="transparent"
            className={classes.navLink}
          >
            Preferences
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={signOut}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default SignedIn;
