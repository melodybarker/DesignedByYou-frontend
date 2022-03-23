import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import { LikesContext } from "../likes/LikesProvider.js";
import "./Post.css";

export const ExploreList = (props) => {
  const history = useHistory();
  const { posts, getPosts } = useContext(PostContext);
  const { likes, addLikes } = useContext(LikesContext)
  const user_id = parseInt(localStorage.getItem("diyuser_pk"));

  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = (e) => {
    const diypost = parseInt(likes.diypost)
    const newLike = {
        diypost: diypost,
        liker: user_id
    }
    addLikes(newLike)
    .then(() => {
        history.push("/saved")
    })
}

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>Posts</h2>
      </header>
      <button style={{display:"block", marginLeft:"auto", marginRight:"auto", marginBottom:"30px"}} onClick={() => history.push("/posts/create")}>Create Post</button>
      {posts.map((p) => {
        return (
          <section className="ind_post" key={p.id} id={`post--${p.id}`}>
          <div className="post_category" style={{ fontSize: "8px" }}>
                {p.category.label}
              </div>
            Post by&nbsp;
            <Link className="post_user" to={`/profiles/${p.diyuser.id}`}>
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

            <button className="saveLike" style={{fontSize:"10px"}} onClick={(e) => {
                e.preventDefault();
                handleLike()
            }} >
                 {p.diyuser.id === user_id ? <div style={{color: 'red'}}>UnSave</div> : <div style={{color: 'blue'}}>Save</div>}</button>


          </section>
        );
      })}
    </article>
  );
};
