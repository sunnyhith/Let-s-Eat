import React, { useContext } from "react";
import Header from "components/Header/Header";
import Logo from "./NavLogo";
import SignedIn from "./signedInLinks";
import SignedOut from "./signedOutLinks";
import { AuthContext } from "contexts/Auth";

const Navbar = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div> </div>;
  } else {
    return (
      <div>
        <Header
          brand={<Logo />}
          color="transparent"
          fixed
          absolute
          rightLinks={currentUser ? <SignedIn /> : <SignedOut />}
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
        />
      </div>
    );
  }
}

export default Navbar;
