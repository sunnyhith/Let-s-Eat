import React, { Component } from "react";
import emailSignIn from "../../backend/account/emailSignIn";
import signInWithGoogle from "../../backend/account/googleSignIn";
import signOut from "../../backend/account/signOut";
import resetPsw from "../../backend/account/emailPswReset";

class SignIn extends Component {
  state = {
    sign_in_email: "",
    sign_in_psw: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    emailSignIn();
    console.log(this.state);
    console.log('Sign in successful');
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h4 className="grey-text text-darken-3">Sign In</h4>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="sign_in_email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="sign_in_psw" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn red z-depth-0">Login</button>
            &nbsp;&nbsp;&nbsp;
          </div>
        </form>

        <button onClick={signInWithGoogle} className="btn red z-depth-0">
              Sign in using Google
        </button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={signOut} className="btn red z-depth-0">
            Sign out
        </button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={resetPsw} className="btn red z-depth-0">
            Forget password
        </button>
      </div>
    );
  }
}

export default SignIn;
