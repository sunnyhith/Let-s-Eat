// This component is used to fetch the list of restaurants from backedn using Yelp Fusion API
// It shouldn't be a part of the page in the webapp
// This should trigger in the following cases:
//    1. When the user preferences data is gathered (by completion of survey)
//    2. When the user is creating an event. We should also ask the current location of the user

import React, { useContext, useState, useEffect } from "react";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

const UserPreferences = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // Todo: Pass the preferences and location as parameters
  useEffect(() => {
    async function getData() {
      const config = {
        headers: {
          Authorization:
            "Bearer ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx"
        }
      };
      const response = await fetch("/api/restaurants", config);
      const json = await response.json();
      setPosts(json.businesses);
    }
    getData();
  }, [loading]);
  // async componentDidMount() {
  //   const response = await fetch("/api/restaurants");
  //   const json = await response.json();
  //   this.setState({ posts: json.businesses });
  // }

  // dev branch stuff
  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
    // master branch stuff
  } else {
    // const { posts } = this.state;
    const postsList = posts.length ? (
      posts.map(post => {
        return (
          <div>
            <div className="center card container" key={post.id}>
              <div className="card-content">
                <Link to={"/business/" + post.id}>
                  <span className="card-title">{post.name}</span>
                </Link>
                <p>Price: {post.price}</p>
                <p>Rating: {post.rating}</p>
                <p>Review Count: {post.review_count}</p>
                <p>Phone: {post.display_phone}</p>
                <img
                  className="imageStyle"
                  src={post.image_url}
                  alt="Food"
                ></img>
              </div>
            </div>
            <br />
          </div>
        );
      })
    ) : (
      <div className="center">Loading Restaurants...</div>
    );
    return (
      <div>
        <Parallax image={require("assets/img/bg.jpg")}>
          {/* <div className="container"> */}
          <h4>Below are the Preferences</h4>
          {postsList}
          {/* </div> */}
        </Parallax>
      </div>
    );
  }
  // const { posts } = this.state;
  //   const postsList = posts.length ? (
  //     posts.map(post => {
  //       return (
  //         <div className="center card container" key={post.id}>
  //           <div className="card-content">
  //             <Link to={"/business/" + post.id}>
  //               <span className="card-title">{post.name}</span>
  //             </Link>
  //             <p>Price: {post.price}</p>
  //             <p>Rating: {post.rating}</p>
  //             <p>Review Count: {post.review_count}</p>
  //             <p>Phone: {post.display_phone}</p>
  //             <img className="imageStyle" src={post.image_url} alt="Food"></img>
  //           </div>
  //         </div>
  //       );
  //     })
  //   ) : (
  //     <div className="center">Loading Restaurants...</div>
  //   );

  //   return (
  //     <React.Fragment>
  //       <Parallax image={require("assets/img/bkg.jpg")}>
  //         <div className="container">
  //           <h4>Below are the Preferences</h4>
  //           {postsList}
  //         </div>
  //       </Parallax>
  //     </React.Fragment>
  //   );
  // };
};

export default UserPreferences;
