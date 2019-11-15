// This component is used to fetch the list of restaurants from backedn using Yelp Fusion API
// It shouldn't be a part of the page in the webapp
// This should trigger in the following cases:
//    1. When the user preferences data is gathered (by completion of survey)
//    2. When the user is creating an event. We should also ask the current location of the user

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../components-css/userPreferences.css";
import { AuthContext } from "../../contexts/Auth";

class UserPreferences extends Component {
  static contextType = AuthContext;
  state = {
    posts: []
  };

  // Todo: Pass the preferences and location as parameters
  async componentDidMount() {
    const response = await fetch("/api/restaurants");
    const json = await response.json();
    this.setState({ posts: json.businesses });
  }

  render() {
    if (!this.context.currentUser) {
      return <Redirect to="/signin" />;
    }
    const { posts } = this.state;
    const postsList = posts.length ? (
      posts.map(post => {
        return (
          <div className="center card container" key={post.id}>
            <div className="card-content">
              <Link to={"/business/" + post.id}>
                <span className="card-title">{post.name}</span>
              </Link>
              <p>Price: {post.price}</p>
              <p>Rating: {post.rating}</p>
              <p>Review Count: {post.review_count}</p>
              <p>Phone: {post.display_phone}</p>
              <img className="imageStyle" src={post.image_url} alt="Food"></img>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">Loading Restaurants...</div>
    );
    return (
      <div className="container">
        <h4>Below are the Preferences</h4>
        {postsList}
      </div>
    );
  }
}

export default UserPreferences;
