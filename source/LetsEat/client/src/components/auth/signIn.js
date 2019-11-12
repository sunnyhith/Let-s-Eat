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

import { emailSignIn, signInWithGoogle} from './authUtil.js';

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/layout/AuthStyle.js";
import PropTypes from 'prop-types';

class SignIn extends React.Component {
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
    }
    else 
    return (
      <div>
      <Parallax image={require("assets/img/bkg.jpg")} >
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
                    component={ Link } to="/password_reset"
                  >
                    Forget Password?
                  </Button>
                  <Button 
                    round
                    color="info" 
                    onClick={emailSignIn}
                    className={classes.inlineButton}
                  >
                    Log In
                  </Button>
                  <Button 
                    color="rose" 
                    round
                    className={classes.inlineButton}
                    component={ Link } to="/signup"
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
