import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
// core components
import Loading from "components/generic/Loading";
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
//Firebase
import firebase from "firebase";
import firebaseConfig from "config/firebaseConfig";
import { AuthContext } from "contexts/Auth";
//Styling
import styles from "assets/jss/layout/AuthStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const SignUp = props => {
  const classes = usestyles();
  const { currentUser, loading } = useContext(AuthContext);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const storeUserIntoFirebase = userInfo => {
    const db = firebaseConfig.firestore();
    var docRef = db
      .collection("users")
      .doc(userInfo.email)
      .set({
        name: userInfo.name,
        hasPreferences: false
      })
      .then(function() {
        setIsSignedUp(true);
        console.log("Signed Up user info successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const emailSignUp = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async result => {
        await result.user
          .updateProfile({
            displayName: firstName + " " + lastName
          })
          .then(() => {
            storeUserIntoFirebase({
              name: firstName + " " + lastName,
              email: result.user.email
            });
          });
      })
      .catch(error => {
        console.log(
          "createUserWithEmailAndPassword failed. " +
            "errorCode: " +
            error.code +
            " errorMessage: " +
            error.message
        );
        window.alert("Fail to sign up using email.\n" + error.message);
      });
  };

  const signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebaseConfig
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
          storeUserIntoFirebase({
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

  if (loading) {
    return <Loading />;
  } else if (currentUser && isSignedUp) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")}>
          <div className={classes.container}>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <p className={classes.divider}>Sign Up with Email</p>
                    <CardBody className={classes.cardBody}>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                person_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                person_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                      <CustomInput
                        labelText="Email"
                        id="email"
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
                        id="password"
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
                        color="rose"
                        round
                        className={classes.inlineButton}
                        onClick={emailSignUp}
                      >
                        Sign Up
                      </Button>
                      <Button
                        simple
                        color="info"
                        className={classes.inlineButton}
                        component={Link}
                        to="/signin"
                      >
                        Already have account? &nbsp; Login
                      </Button>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <p>or</p>
                      <Button
                        simple
                        color="google"
                        round
                        onClick={signInWithGoogle}
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
};

export default SignUp;
