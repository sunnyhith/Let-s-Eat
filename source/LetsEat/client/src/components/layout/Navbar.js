import React from "react";
import Header from "components/Header/Header";
import SignedIn from "./signedInLinks";
import SignedOut from "./signedOutLinks";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header
          brand="Let's Eat"
          color="transparent"
          fixed
          absolute
          rightLinks={
            this.props.isLogedin ? <SignedIn /> : <SignedOut />
          }
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
