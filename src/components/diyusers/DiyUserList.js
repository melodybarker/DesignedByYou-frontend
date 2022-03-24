import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { DiyUserContext } from "./DiyUserProvider";
import { PostContext } from "../posts/PostProvider"
import "../styles/diyuser.css";

export const DiyUserList = () => {
  const { currentUser, getCurrentUser } = useContext(DiyUserContext);
  const { posts } = useContext(PostContext)
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("diyuser_pk"));


  useEffect(() => {
    getCurrentUser(userId);
  }, []);

  return (
    <article className="diyuser_wrapper">
      <header>
        <h1>{currentUser.user?.first_name}{" "}{currentUser.user?.last_name}'s Profile</h1>
      </header>
      <div className="user_header">
        <div>
          <ul>
            <img
              className="profile_image"
              src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
            />
          </ul>
          <ul>
            <b>Email:</b> {""} {currentUser.user?.email}
          </ul>
          <ul>
            <b>Joined On:</b> {currentUser.user?.date_joined}
          </ul>
          <ul>


          <article className="post_list">
      <header className="post_header">
        <h2>Posts</h2>
      </header>
      <button style={{display:"block", marginLeft:"auto", marginRight:"auto", marginBottom:"30px"}} onClick={() => history.push("/posts/create")}>Create Post</button>
      {posts.map((p) => {
          if(p.diyuser?.user.id === userId) {
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
        )}
      })}
    </article>


          </ul>
        </div>
      </div>
    </article>

  );
};
