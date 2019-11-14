import React, { useContext } from "react";
import Parallax from "components/Parallax/Parallax.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const Home = () => {
  const { currentUser, preference, loading } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  console.log("home user ", currentUser);
  console.log("home preference ", preference);
  console.log("home loading ", loading);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    if (!preference) {
      return <Redirect to="/survey" />;
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
  }
};

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

export default Home;
