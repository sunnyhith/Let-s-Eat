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

import { signInWithGoogle } from './authUtil.js';

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/layout/AuthStyle.js";
import PropTypes from 'prop-types';

import emailSignUp from "../../backend/account/emailSignUp";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    emailSignUp();
    console.log(this.state);    
  };

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
                      id="sign_in_psw"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
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
                      color="rose" 
                      round
                      className={classes.inlineButton}
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
    // return (
    //   <div className="container">
    //     <form onSubmit={this.handleSubmit} className="white">
    //       <h4 className="grey-text text-darken-3">Sign Up</h4>
    //       <div className="input-field">
    //         <label htmlFor="firstName">First Name</label>
    //         <input type="text" id="firstName" onChange={this.handleChange} />
    //       </div>
    //       <div className="input-field">
    //         <label htmlFor="lastName">Last Name</label>
    //         <input type="text" id="lastName" onChange={this.handleChange} />
    //       </div>
    //       <div className="input-field">
    //         <label htmlFor="email">Email</label>
    //         <input type="email" id="email" onChange={this.handleChange} />
    //       </div>
    //       <div className="input-field">
    //         <label htmlFor="password">Password</label>
    //         <input type="password" id="password" onChange={this.handleChange} />
    //       </div>
    //       <div className="input-field">
    //         <button className="btn red z-depth-0">Sign Up</button>
    //       </div>
    //     </form>
    //     <div>
    //       <button onClick={signUpWithGoogle} className="btn red z-depth-0">
    //           Sign up using Google
    //       </button>
    //     </div>
    //   </div>
    // );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
