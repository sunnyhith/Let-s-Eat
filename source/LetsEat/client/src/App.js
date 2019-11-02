import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/generic/Home";
import CreateEvent from "./components/events/createEvent";
import UserPreferences from "./components/preferences/userPreferences";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import Post from "./components/preferences/Post";
import Survey from "./components/preferences/Survey";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create" component={CreateEvent} />
            <Route path="/preferences" component={UserPreferences} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/survey" component={Survey} />
            <Route path="/business/:post_id" component={Post} />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
