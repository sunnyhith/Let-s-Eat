import React, { useContext, useState, useEffect } from "react";
import Loading from "components/generic/Loading";
import Parallax from "components/Parallax/Parallax.js";
import { AuthContext } from "../../contexts/Auth";
import { Redirect } from "react-router-dom";

const Post = props => {
  const { currentUser, loading } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getData() {
      const id = props.match.params.post_id;
      const url = `/api/restaurants/${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setPost(json);
    }
    getData();
  }, [loading]);

  const titleCase = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  if (loading) {
    return <Loading />;
  } else if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  const postData = post ? (
    <div className="center card">
      <div className="card-content center">
        <span className="card-title">{post.name}</span>
        <p>Price: {post.price}</p>
        <p>Rating: {post.rating}</p>
        <p>Review Count: {post.review_count}</p>
        <p>Phone: {post.display_phone}</p>
        <img className="imageStyle" src={post.photos[0]} alt="Food" />
        <img className="imageStyle" src={post.photos[1]} alt="Food" />
        <img className="imageStyle" src={post.photos[2]} alt="Food" />
      </div>
    </div>
  ) : (
    <div className="center">Loading Post Details...</div>
  );
  return (
    <React.Fragment>
      <Parallax image={require("assets/img/bkg.jpg")}>
        <div className="container">{postData}</div>;
      </Parallax>
    </React.Fragment>
  );
};

export default Post;
