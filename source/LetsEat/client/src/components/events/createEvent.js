import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

class CreateEvent extends Component {
  static contextType = AuthContext;

  render() {
    if (!this.context.currentUser) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h1>This is Create Event Page</h1>
      </div>
    );
  }
}

export default CreateEvent;
