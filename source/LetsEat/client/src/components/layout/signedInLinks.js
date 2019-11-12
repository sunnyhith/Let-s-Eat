import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";

import { signOut } from "components/auth/authUtil.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import firebaseConfig from "../../config/firebaseConfig";
import { AuthContext } from "../../contexts/Auth";

class SignedIn extends React.Component {
  static contextType = AuthContext;

  signOut() {
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
          window.alert("Fail to sign up using email\n" + error.message);
        });
    } else {
      window.alert("User is not signed in.");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Button
              component={Link}
              to="/survey"
              color="transparent"
              className={classes.navLink}
            >
              Survey
            </Button>
          </ListItem>
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
              onClick={this.signOut}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </div>
    );
  }
}

SignedIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignedIn);
