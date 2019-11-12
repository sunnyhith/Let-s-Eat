import React from "react";
import { Redirect, Link } from "react-router-dom";
// core components
import Parallax from "components/Parallax/Parallax.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { emailSignIn, signInWithGoogle } from "./authUtil.js";

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/layout/AuthStyle.js";
import PropTypes from "prop-types";

import * as firebase from "firebase/app";
import firebaseConfig from "../../config/firebaseConfig";
import { AuthContext } from "../../contexts/Auth";

// //initial Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);

class SignIn extends React.Component {
  static contextType = AuthContext;

  storeUserIntoFirebase(userInfo) {
    const db = firebaseConfig.firestore();
    var docRef = db
      .collection("users")
      .doc(userInfo.uid)
      .set({
        name: userInfo.name,
        email: userInfo.email,
        hasPreference: false
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  emailSignIn() {
    var email = document.getElementById("sign_in_email").value;
    var password = document.getElementById("sign_in_psw").value;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        console.log(
          "signInWithEmailAndPassword failed. " +
            "errorCode: " +
            error.code +
            " errorMessage: " +
            error.message
        );
        window.alert(
          "Error: Fail to sign in using email." +
            "Please check your email and password is correct."
        );
      });
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebaseConfig
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
          this.storeUserIntoFirebase({
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email
          });
        }
        window.alert("Welcome back! " + result.user.displayName);
      })
      .catch(error => {
        console.log("Fail to sign in using Google account.");
      });
  };

  render() {
    //For styling
    const { classes } = this.props;
    console.log("signin");
    console.log(this.context.currentUser);
    if (this.context.currentUser) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div>
          <Parallax image={require("assets/img/bkg.jpg")}>
            <div className={classes.container}>
              <GridContainer justify="flex-start">
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form}>
                      <p className={classes.divider}>Login with Email</p>
                      <CardBody className={classes.cardBody}>
                        <CustomInput
                          labelText="Email"
                          id="sign_in_email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  mail_outline
                                </Icon>
                              </InputAdornment>
                            )
                          }}
                        />
                        <CustomInput
                          labelText="Password"
                          id="sign_in_psw"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off"
                          }}
                        />
                        <Button
                          simple
                          color="info"
                          size="sm"
                          component={Link}
                          to="/password_reset"
                        >
                          Forget Password?
                        </Button>
                        <Button
                          round
                          color="info"
                          onClick={this.emailSignIn}
                          className={classes.inlineButton}
                        >
                          Log In
                        </Button>
                        <Button
                          color="rose"
                          round
                          className={classes.inlineButton}
                          component={Link}
                          to="/signup"
                        >
                          Sign Up
                        </Button>
                        <p className={classes.divider}>or</p>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          simple
                          color="google"
                          round
                          onClick={this.signInWithGoogle}
                        >
                          <i className={"fab fa-google"} />
                          &nbsp; Login with Google
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
        </div>
      );
    }
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
