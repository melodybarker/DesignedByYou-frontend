import React, { useContext, useEffect } from "react";
import { FollowingContext } from "./FollowingProvider";
import { useHistory } from "react-router-dom";
import "./Following.css";

export const FollowingList = () => {
  const userId = parseInt(localStorage.getItem("diyuser_pk"));
  const { following, getFollowing, releaseFollowing } =
    useContext(FollowingContext);
  const history = useHistory();

  useEffect(() => {
    console.log("FollowingList: useEffect - getFollowing");
    getFollowing();
  }, []);

  const removeFollowing = (id) => () => {
    releaseFollowing(id).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      <h2>Your Feed:</h2>
      {following.map((follow) => {
        if (follow.from_diyuser.id === userId) {
          return (
            <section className="following" key={follow.id}>
              <div
                className="following__name"
                id={`following--${follow.id}`}
              >
                Name: {follow.to_diyuser.user.first_name} {follow.to_diyuser.user.last_name}
                <div
                  className="following__email"
                  id={`following--${follow.id}`}
                >
                  Email: {follow.to_diyuser.user.email}
                </div>
                <button
                  className="unfollowButton"
                  onClick={removeFollowing(follow.id)}
                >
                  unfollow
                </button>
              </div>
            </section>
          )}
      })}
    </>
  );
};
