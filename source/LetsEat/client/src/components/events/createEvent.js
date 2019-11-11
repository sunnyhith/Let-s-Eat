import React from "react";
import {testEvent} from "components/events/event";
import Button from "components/CustomButtons/Button.js";

const CreateEvent = () => {
  return (
    <div className="container">
      <h1>This is Create Event Page</h1>
      <Button onClick={testEvent}>
        Test Event
      </Button>
    </div>
  );
};

export default CreateEvent;
