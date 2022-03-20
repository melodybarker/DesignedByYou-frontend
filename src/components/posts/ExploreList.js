import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import "./Post.css";

export const ExploreList = (props) => {
  const history = useHistory();
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>Posts</h2>
      </header>
      <button style={{display:"block", marginLeft:"auto", marginRight:"auto", marginBottom:"30px"}} onClick={() => history.push("/posts/create")}>Create Post</button>
      {posts.map((p) => {
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
          </section>
        );
      })}
    </article>
  );
};
