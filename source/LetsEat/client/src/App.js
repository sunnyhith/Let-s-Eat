import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "components/layout/Navbar";
import Home from "components/generic/Home";
import CreateEvent from "components/events/createEvent";
import Event from "components/events/event";
import UserPreferences from "components/preferences/userPreferences";
import SignIn from "components/auth/signIn";
import SignUp from "components/auth/signUp";
import ResetPassword from "components/auth/resetPassword";
import Post from "components/preferences/Post";
import Survey from "components/preferences/Survey";
import suggest from "components/suggest-restaurant/suggestRestaurant";
import "assets/scss/material-kit-react.scss?v=1.8.0";
import { AuthProvider } from "./contexts/Auth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/password_reset" component={ResetPassword} />
            <Route path="/create" component={CreateEvent} />
            <Route path="/event/:event_id" component={Event} />
            <Route path="/preferences" component={UserPreferences} />
            <Route path="/survey" component={Survey} />
            <Route path="/business/:post_id" component={Post} />
            <Route path="/suggest_restaurant" component={suggest} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
