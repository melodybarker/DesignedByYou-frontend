import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../comments/CommentProvider";
import "./CommentBox.css";
import moment from "moment";

export const CommentList = () => {
  const history = useHistory();
  const {
    comments,
    getComments,
    deleteComment,
    getCommentById,
    editComment,
    createNewComment,
  } = useContext(CommentContext);
  const diyuser = parseInt(localStorage.getItem("diyuser_id"));
  const { commentId } = useParams();
  const { postId } = useParams();
  const updateComment = commentId ? true : false;

  const [comment, setComment] = useState({
    post: 0,
    diyuser: parseInt(localStorage.getItem("diyuser_id")),
    content: "",
    cdate: Date.now(),
  });

  useEffect(() => {
    getComments().then(() => {
      if (commentId) {
        getCommentById(parseInt(commentId)).then((comment) => {
          setComment(comment);
        });
      }
    });
  }, []);

  const handleControlInputChange = (e) => {
    const newComment = { ...comment };
    newComment[e.target.id] = e.target.value;
    setComment(newComment);
  };

  const handleSaveComment = () => {
    const post_id = parseInt(comment.post);
    if (updateComment) {
      editComment({
        id: comment.id,
        post: post_id,
        diyuser: diyuser,
        content: "",
        date: Date.now(),
      }).then(() => history.push(`/posts/${postId}`));
      window.location.reload();
    } else {
      const newComment = {
        post: postId,
        diyuser: diyuser,
        content: comment.content,
        date: Date.now(),
      };
      createNewComment(newComment).then(() => {
        window.location.reload();
      });
    }
  };

  const handleDelete = (id) => () => {
    deleteComment(id).then(() => {
      history.push(`/posts/${postId}`);
    });
    window.location.reload();
  };

  return (
    <section className="CommentList">
      <ul style={{ background: "lightGray" }}>
        {comments.map((c) => {
          return (
            <div
              className="comments"
              key={c.id}
              id={`comments--${c.id}`}
              style={{ fontSize: "10px" }}
            >
              Comment by&nbsp;
              <Link
                className="comment_diyuser"
                style={{ fontSize: "10px" }}
                to={`/profile/$`}
              >
                {c.diyuser?.user.first_name} {c.diyuser?.user.last_name}
              </Link>
              <div className="comment_content" style={{ fontSize: "14px" }}>
                {c.content}
              </div>
              <div className="comment_created_on" style={{ fontSize: "8px" }}>
                {moment(c.created_on).format("MMMM DD YYYY, h:mm a")}
              </div>
              <button
                onClick={handleDelete(c.id)}
                hidden={c.diyuser.id === diyuser ? "" : "hidden"}
                style={{ fontSize: "8px" }}
              >
                remove
              </button>
            </div>
          );
        })}
      </ul>
      <form className="comments">
        <input
          type="textarea"
          required
          autoFocus
          className="commentBox"
          id="content"
          placeholder="Write a comment..."
          onChange={handleControlInputChange}
          value={comment.content}
        />
        <button
          className="saveComment"
          style={{ fontSize: "10px" }}
          d
          onClick={(e) => {
            e.preventDefault();
            handleSaveComment();
          }}
        >
          Add
        </button>
      </form>
    </section>
  );
};
