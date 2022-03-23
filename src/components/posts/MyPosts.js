import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import "./Post.css";

export const MyPosts = (props) => {
  const history = useHistory();
  const { posts, getPosts, updatePost, deletePost } = useContext(PostContext);
  const userId = parseInt(localStorage.getItem("diyuser_pk"));

  useEffect(() => {
    getPosts();
  }, []);

  const handleRelease = (id) => () => {
    deletePost(id).then(() => {
      window.location.reload();
    });
  };

  return (

<article className="post_list">
      <header className="post_header">
        <h2>Posts</h2>
      </header>
      <button style={{display:"block", marginLeft:"auto", marginRight:"auto", marginBottom:"30px"}} onClick={() => history.push("/posts/create")}>Create Post</button>
      {posts.map((p) => {
        if (p.diyuser.id === userId ) {
        return (
          <section className="ind_post" key={p.id} id={`post--${p.id}`}>
            Post by&nbsp;
            <Link className="post_user" to={`/profiles/$`}>
              <i>{p.diyuser.user.first_name} {p.diyuser.user.last_name}</i>
            </Link>
            <div className="post_publicatonDate" style={{ fontSize: "10px" }}>
              {p.date}
            </div>
            <div className="post_title">
              <Link to={`/posts/${p.id}`}>
              <b>{p.title}</b>
              </Link>
            </div>
            <Link to={`/posts/${p.id}`}>
              <img src={p.image_url} width="500px" height="350px" />
            </Link>




              <button
                className="edit_post"
                style={{ fontSize: "10px" }}
                onClick={() => {
                  history.push(`/posts/edit/${p.id}`);
                }}
                hidden={p.diyuser.id === userId ? "" : "hidden"}
              >
                Edit Post
              </button>
              &nbsp;
              <button
                className="delete_post"
                style={{ fontSize: "10px" }}
                onClick={handleRelease(p.id)}
                hidden={p.diyuser.id === userId ? "" : "hidden"}
              >
                Delete Post
              </button>
            </section>
          )}

      })}
    </article>
  );
};
