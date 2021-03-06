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
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//Firebase
import firebaseConfig from "config/firebaseConfig";
import { AuthContext } from "contexts/Auth";
//Styling
import styles from "assets/jss/layout/AuthStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const usestyles = makeStyles(styles);

const ResetPassword = props => {
  const classes = usestyles();
  const { currentUser, loading } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  const resetPWD = () => {
    var emailAddress = document.getElementById("email").value;
    //TODO: add email check
    firebaseConfig
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        window.alert("password reset email sent.");
        setRedirect(true);
      })
      .catch(function(error) {
        window.alert("Failed to sent password reset email.\n" + error.message);
      });
  };

  if (loading) {
    return <Loading />;
  } else if (currentUser) {
    return <Redirect to="/" />;
  } else if (redirect) {
    return <Redirect to="/signIn" />;
  } else
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")}>
          <div className={classes.container}>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <p className={classes.divider}>Reset Password</p>
                    <CardBody className={classes.cardBody}>
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
                      <Button
                        round
                        color="info"
                        onClick={resetPWD}
                        className={classes.inlineButton}
                      >
                        Send Reset Email
                      </Button>
                      <Button
                        simple
                        size="sm"
                        color="info"
                        component={Link}
                        to="/signIn"
                      >
                        Go back to Log in
                      </Button>
                    </CardBody>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>
    );
};

export default ResetPassword;
