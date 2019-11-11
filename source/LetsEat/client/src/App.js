import React from "react";
import * as firebase from 'firebase';
import firebaseApp from "components/firebaseInit/firebaseInit";

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



require('firebase/auth');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("now user");
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }
  
  render() {
    if (this.state.loading) {
      return (<div></div>);
    } else {
      return (
        <div>
        <BrowserRouter>
          <Navbar isLogedin={this.state.authenticated} />
          <div className="App">
            <Switch>
              <Route path="/" exact render={ () => <Home isLogedin={this.state.authenticated}/>} />
              <Route path="/signin" render={ () => <SignIn isLogedin={this.state.authenticated}/>} />
              <Route path="/signup" render={ () => <SignUp isLogedin={this.state.authenticated}/>} />
              <Route path="/password_reset" render={ () => <ResetPassword isLogedin={this.state.authenticated}/>} />
              <Route path="/create" render={ () => <CreateEvent isLogedin={this.state.authenticated}/>} />
              <Route path="/preferences" render={ () => <UserPreferences isLogedin={this.state.authenticated}/>} />
              <Route path="/survey" render={ () => <Survey isLogedin={this.state.authenticated}/>} />
              <Route path="/business/:post_id" render={ (props) => <Post {...props} isLogedin={this.state.authenticated} />} />
            </Switch>
          </div>
        </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
