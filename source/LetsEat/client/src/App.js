import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "components/layout/Navbar";
import Home from "./components/generic/Home";
import CreateEvent from "./components/events/createEvent";
import UserPreferences from "./components/preferences/userPreferences";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import ResetPassword from "./components/auth/resetPassword";
import Post from "./components/preferences/Post";
import Survey from "./components/preferences/Survey";

import "assets/scss/material-kit-react.scss?v=1.8.0";

import * as firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  hasPreference(uid) {
    console.log(uid);
    const db = firebase.firestore();
    var docRef = db.collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            user: this.state.user.concat([
              {
                hasPreference: doc.data().hasPreference
              }
            ])
          });
        } else {
          console.log("no preference");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          loading: false,
        });
        this.hasPreference(user.uid);
      } else {
        this.setState({
          user: null,
          loading: false
        });
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }
  
  render() {
    console.log(this.state);
    if (this.state.loading) {
      return (<div></div>);
    } else {
      return (
        <div>
        <BrowserRouter>
          <Navbar user={this.state.user} />
          <div className="App">
            <Switch>
              <Route path="/" exact render={ () => <Home user={this.state.user}/>} />
              <Route path="/signin" render={ () => <SignIn user={this.state.user}/>} />
              <Route path="/signup" render={ () => <SignUp user={this.state.user}/>} />
              <Route path="/password_reset" render={ () => <ResetPassword user={this.state.user}/>} />
              <Route path="/create" render={ () => <CreateEvent user={this.state.user}/>} />
              <Route path="/preferences" render={ () => <UserPreferences user={this.state.user}/>} />
              <Route path="/survey" render={ () => <Survey user={this.state.user}/>} />
              <Route path="/business/:post_id" render={ (props) => <Post {...props} user={this.state.user} />} />
            </Switch>
          </div>
        </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
