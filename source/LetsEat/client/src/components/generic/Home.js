import React from "react";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/Auth";

class Home extends React.Component {
  static contextType = AuthContext;

  render() {
    console.log("home");
    console.log(this.context.currentUser);

    if (!this.context.currentUser) {
      return <Redirect to="/signin" />;
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

    // const content =
    //   this.context.currentUser &&
    //   !this.hasPreferences(this.context.currentUser.uid) ? (
    //     <div>Loading Content...</div>
    //   ) : (
    //     <div>
    //       <Parallax image={require("assets/img/bkg.jpg")}></Parallax>
    //       <div>
    //         <h1>This is the Home Page</h1>
    //       </div>
    //     </div>
    //   ); //<Redirect to="/signIn" />;

    // return <div>{content}</div>;

    // if (user && this.hasPreference(user.uid)) {
    //   return (
    //     <div>
    //       <Parallax image={require("assets/img/bkg.jpg")}></Parallax>
    //       <div>
    //         <h1>This is the Home Page</h1>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return <Redirect to="/survey" />;
    // }
  }
}

export default Home;
