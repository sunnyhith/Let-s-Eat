import React, { useContext } from "react";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "contexts/Auth";

const Home = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  } else if (!preference) {
    return <Redirect to="/survey" />;
  } else {
    return (
      <div>
        <Parallax image={require("assets/img/bkg.jpg")}>
          <div>
            <h1>This is the Home Page</h1>
          </div>
        </Parallax>
      </div>
    );
  }
};

export default Home;
