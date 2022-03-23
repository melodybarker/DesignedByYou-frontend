import React, { useContext, useEffect } from "react";
import { LikesContext } from "./LikesProvider";
import { Link, useHistory } from "react-router-dom";
import "./Like.css";

export const LikesList = () => {
  const userId = parseInt(localStorage.getItem("diyuser_pk"));
  const { likes, getLikes, releaseLikes } =
    useContext(LikesContext);
  const history = useHistory();

  useEffect(() => {
    console.log("LikesList: useEffect - getLikes");
    getLikes();
  }, []);

  const removeLikes = (id) => () => {
    releaseLikes(id).then(() => {
      history.push("/saved");
    });
  };

  return (
    <>
      <h2>Saved Posts</h2>
      {likes.map((like) => {
        if (like.liker?.user?.id === userId) {
          return (
            <section className="ind_post" key={like.id}>
              <div
                className="Likes__name"
                id={`Likes--${like.id}`}
              >
                Post by&nbsp; {like.liker?.user?.first_name} {like.liker?.user?.last_name}
                <div className="post_title">
              <Link to={`/posts/${like.id}`}>
              <b>{like.diypost.title}</b>
              </Link>
            </div>
            <Link to={`/posts/${like.id}`}>
              <img src={like.diypost.image_url} width="500px" height="350px" />
            </Link>
                <button
                  className="unlikeButton"
                  onClick={removeLikes(like.id)}
                >
                  unlike
                </button>

              </div>
            </section>
          )}
      })}
    </>
  );
};
