import React, { Component } from "react";
import emailSignIn from "../../backend/account/emailSignIn";
import signInWithGoogle from "../../backend/account/googleSignIn";
import signOut from "../../backend/account/signOut";
import resetPsw from "../../backend/account/emailPswReset";


////////////////// This script is not done yet, 
//  need to create a page to input email address for password reset//////////////////
class reqPswReset extends Component {
  state = {
    sign_in_email: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    emailSignIn();
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h4 className="grey-text text-darken-3">Sign In</h4>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="reset_psw_email" onChange={this.handleChange} />
          </div>
        </form>
      </div>
    );
  }
}

export default reqPswReset;