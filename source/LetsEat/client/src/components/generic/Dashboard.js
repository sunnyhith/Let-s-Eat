import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Dashboard = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  console.log("dash user ", currentUser);
  console.log("dash preference ", preference);
  console.log("dash loading ", loading);

  if (currentUser && !loading && preference) {
    return <p>This is Dashboard page</p>;
  } else {
    return <Redirect to="/survey" />;
  }
};

export default Dashboard;
