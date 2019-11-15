import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

import * as firebase from "firebase";

class Survey extends Component {
  static contextType = AuthContext;
  state = {
    firstName: "",
    lastName: "",
    currentLocation: "",
    foodPreferences: "",
    pricePreference: "",
    favCuisines: []
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // updatePreference = (userInfo) => {
  //   //TODO: store all preference into firebase
  //   const db = firebase.firestore();
  //   var docRef = db.collection("users").doc(userInfo.uid).update({
  //       hasPreference: false,
  //   })
  //   .then(function() {
  //       console.log("Document successfully written!");
  //   })
  //   .catch(function(error) {
  //       console.error("Error writing document: ", error);
  //   });
  // }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    if (!this.context.currentUser) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h4 className="grey-text text-darken-3">
            Please fill out the following details
          </h4>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="currentLocation">Current Location</label>
            <input
              type="text"
              id="currentLocation"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="foodPreferences">Food Preferences</label>
            <input
              type="text"
              id="foodPreferences"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="pricePreference">Price Preference</label>
            <input
              type="text"
              id="pricePreference"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn red z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Survey;
