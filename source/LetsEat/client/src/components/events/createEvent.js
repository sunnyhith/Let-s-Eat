import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import {testEvent} from "components/events/event";
import Button from "components/CustomButtons/Button.js";

class CreateEvent extends Component {
  static contextType = AuthContext;

  render() {
    if (!this.context.currentUser) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h1>This is Create Event Page</h1>
        <Button onClick={testEvent}>
          Test Event
        </Button>
      </div>
    );
  }
}

export default CreateEvent;
