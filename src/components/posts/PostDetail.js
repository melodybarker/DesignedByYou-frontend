import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import { CommentContext } from "../comments/CommentProvider";
import { CommentBox } from "../comments/CommentBox";

export const PostDetail = () => {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const { getPostById, deletePost } = useContext(PostContext);
  const { deleteComment } = useContext(CommentContext);
  const userId = parseInt(localStorage.getItem("diyuser_pk"));
  const { postId } = useParams();

  const reloadComments = () => {
    window.location.reload();
  };

  useEffect(() => {
    getPostById(postId).then(setPost);
  }, []);

  const handleDelete = (id) => () => {
    deleteComment(id).then(() => {
      history.push(`/posts/${postId}`);
    });
  };

  const handleRelease = (id) => () => {
    deletePost(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <article className="post_list">
    <h2>post detail</h2>
      <Link className="post_header" style={{ textDecoration: "none" }} to={`/`}>
        <h2>&#128281;</h2>
      </Link>
      <button
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "30px",
        }}
        onClick={() => history.push("/posts/create")}
      >
        Create Post
      </button>
      <section className="ind_post">
        Post by&nbsp;
        <Link className="post_user" to={`/profile/$`}>
          <i>
            {post.diyuser?.user.first_name} {post.diyuser?.user.last_name}
          </i>
        </Link>
        <div className="post_date" style={{ fontSize: "10px" }}>
          {post.date}
        </div>
        <div className="post_title">
          <b>{post.title}</b>
        </div>
        <img
          className="post_image"
          src={post.image_url} alt="pic"
          width="500px"
          height="350px"
        />
        <div className="post_content">{post.content}</div>
        <button
                className="edit_post"
                style={{ fontSize: "10px" }}
                onClick={() => {
                  history.push(`/posts/edit/${post.id}`)
                }}
                hidden={post.diyuser?.id === userId ? "" : "hidden"}
              >
                Edit Post
              </button>
              &nbsp;
              <button
                className="delete_post"
                style={{ fontSize: "10px" }}
                onClick={handleRelease(post.id)}
                hidden={post.diyuser?.id === userId ? "" : "hidden"}
              >
                Delete Post
              </button>
        <div>
          <h2 style={{ fontSize: "16px" }}>Comments</h2>
          <div className="postReactions">
          </div>
          <ul style={{ background: "lightGray" }}>
            {post.comments?.map((comment) => {
              return (
                <div
                  className="comments"
                  key={comment.id}
                  id={`comments--${comment.id}`}
                  style={{ fontSize: "10px" }}
                >
                  Comment by&nbsp;
                  <Link
                    className="comment_diyuser"
                    style={{ fontSize: "10px" }}
                    to={`/profile/$`}
                  >
                    {comment.diyuser.user.first_name}{" "}
                    {comment.diyuser.user.last_name}
                  </Link>
                  <div className="comment_content" style={{ fontSize: "14px" }}>
                    {comment.content}
                  </div>
                  <div
                    className="comment_date"
                    style={{ fontSize: "8px" }}
                  >
                    {comment.date}
                  </div>
                  <button
                    onClick={handleDelete(comment.id)}
                    hidden={comment.diyuser.id === userId ? "" : "hidden"}
                    style={{ fontSize: "8px" }}
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </ul>
          <div className="commentBox">
            <CommentBox reloadComments={reloadComments} />
          </div>
        </div>
      </section>
    </article>
  );
};
