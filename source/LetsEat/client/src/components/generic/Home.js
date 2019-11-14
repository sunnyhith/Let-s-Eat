import React, { useContext } from "react";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Home = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  if (currentUser && loading) {
    return <h1>Loading...</h1>;
  }
  if (!loading && !currentUser) {
    return <Redirect to="/signin" />;
  }
  if (!preference) {
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
