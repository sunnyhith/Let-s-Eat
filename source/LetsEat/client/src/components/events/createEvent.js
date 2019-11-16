import React, { useContext } from "react";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "contexts/Auth";

const CreateEvent = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  }
  return (
    <React.Fragment>
      <Parallax image={require("assets/img/bkg.jpg")}>
        <div>
          <h1>This is Create Event Page</h1>
        </div>
      </Parallax>
    </React.Fragment>
  );
};

export default CreateEvent;
