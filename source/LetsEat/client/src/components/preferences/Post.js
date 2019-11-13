import React, { Component } from "react";
import Parallax from "components/Parallax/Parallax.js";

class Post extends Component {
  state = {
    post: null
  };

  async componentDidMount() {
    let id = this.props.match.params.post_id;
    const url = `/api/restaurants/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    this.setState({ post: json });
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  render() {
    const postData = this.state.post ? (
      <div className="center card">
        <div className="card-content center">
          <span className="card-title">{this.state.post.name}</span>
          <p>Price: {this.state.post.price}</p>
          <p>Rating: {this.state.post.rating}</p>
          <p>Review Count: {this.state.post.review_count}</p>
          <p>Phone: {this.state.post.display_phone}</p>
          <img
            className="imageStyle"
            src={this.state.post.photos[0]}
            alt="Food"
          ></img>
          <img
            className="imageStyle"
            src={this.state.post.photos[1]}
            alt="Food"
          ></img>
          <img
            className="imageStyle"
            src={this.state.post.photos[2]}
            alt="Food"
          ></img>
        </div>
      </div>
    ) : (
      <div className="center">Loading Post Details...</div>
    );
    return (
    <Parallax image={require("assets/img/bg.jpg")}>
      <h4>Restaurant Info : </h4>
      <div className="container">
        {postData}
      </div>
    </Parallax>);
  }
}

export default Post;
