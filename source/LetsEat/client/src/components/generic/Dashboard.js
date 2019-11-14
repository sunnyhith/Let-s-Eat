import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Dashboard = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  console.log("dash user ", currentUser);
  console.log("dash preference ", preference);
  console.log("dash loading ", loading);
  // console.log("dash state preference ", this.state.preference);

  // if (!this.context.currentUser) {
  //   console.log("dash->signin");

  //   return <Redirect to="/signin" />;
  // } else {
  //   if (this.hasPreferences(this.context.currentUser.uid))

  if (currentUser && !loading && preference) {
    return <p>This is Dashboard page</p>;
  } else {
    return <Redirect to="/survey" />;
  }

  //   if(this.context.currentUser) {
  //     return <p>This is Dashboard page</p>;
  //   } else if (!this.hasPreferences(this.context.currentUser.uid)) {
  //     return <Redirect to="/survey" />;
  //   }
};

export default Dashboard;
