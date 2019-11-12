import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import * as firebase from "firebase/app";
// import firebaseConfig from "../../config/firebaseConfig";

class Dashboard extends Component {
  state = {
    currentUser: null
  };
  static contextType = AuthContext;

  componentDidMount() {
    if (this.context.currentUser) {
      this.setState({ currentUser: this.context.currentUser });
    }
  }

  hasPreferences(uid) {
    const db = firebase.firestore();
    db.collection("users")
      .doc(`${uid}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          return true; //doc.data().hasPreferences;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return true;
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
        return true;
      });
  }

  render() {
    if (this.state.currentUser) {
      if (this.hasPreferences(this.state.currentUser.uid)) {
        return <p>This is Dashboard page</p>;
      } else {
        return <Redirect to="/survey" />;
      }
    } else {
      return <div>Loading...</div>;
    }
    //   if(this.context.currentUser) {
    //     return <p>This is Dashboard page</p>;
    //   } else if (!this.hasPreferences(this.context.currentUser.uid)) {
    //     return <Redirect to="/survey" />;
    //   }
  }
}

export default Dashboard;
