import React from "react";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    if(!this.props.isLogedin){
      return (<Redirect to="/signIn"/>);
    }
    return (
        <div>
          <Parallax image={require("assets/img/bkg.jpg")}>
          </Parallax>
          <div>
            <h1>This is the Home Page</h1>
          </div>
        </div>
    );
  }
}


export default Home;
