import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Header/Header";
import Logo from "./NavLogo";
import SignedIn from "./signedInLinks";
import SignedOut from "./signedOutLinks";
import { AuthContext } from "../../contexts/Auth";

class Navbar extends React.Component {
  static contextType = AuthContext;

  render() {
    console.log("from navbar");
    console.log(this.context);

    return (
      <div>
        <Header
          brand={<Logo />}
          color="transparent"
          fixed
          absolute
          rightLinks={this.context.currentUser ? <SignedIn /> : <SignedOut />}
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
      </div>
    );
  }
}

export default Navbar;
