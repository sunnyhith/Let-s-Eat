import React, { Component } from "react";
import emailSignUp from "../../backend/account/emailSignUp";
import signUpWithGoogle from "../../backend/account/googleSignUp";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    emailSignUp();
    console.log(this.state);    
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h4 className="grey-text text-darken-3">Sign Up</h4>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn red z-depth-0">Sign Up</button>
          </div>
        </form>
        <div>
          <button onClick={signUpWithGoogle} className="btn red z-depth-0">
              Sign up using Google
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
