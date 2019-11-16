import React, { useContext } from "react";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "contexts/Auth";
import { testEvent } from "components/events/event";
import Button from "components/CustomButtons/Button.js";

const CreateEvent = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (!preference) {
    return <Redirect to="/survey" />;
  } else {
    return (
      <React.Fragment>
        <Parallax image={require("assets/img/bkg.jpg")}>
          <div className="container">
            <h1>This is Create Event Page</h1>
            <Button onClick={testEvent}>Test Event</Button>
          </div>
        </Parallax>
      </React.Fragment>
    );
  }
};

export default CreateEvent;
