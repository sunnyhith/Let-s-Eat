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

import { emailSignUp, signInWithGoogle } from './authUtil.js';

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/layout/AuthStyle.js";
import PropTypes from 'prop-types';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //For styling
    const { classes } = this.props;

    if (this.props.isLogedin) {
      return (
        <Redirect to="/"/>
      );
    } else {
      return (
        <div>
        <Parallax image={require("assets/img/bkg.jpg")} >
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
                      component={ Link } to="/signin"
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
                      <i className={ "fab fa-google"} />
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
