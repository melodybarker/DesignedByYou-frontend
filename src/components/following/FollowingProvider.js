import React, {useState, createContext} from "react";

export const FollowingContext = createContext();

export const FollowingProvider = (props) => {
    const [following, setFollowing] = useState([])

    const getFollowing = () => {
        return fetch("http://localhost:8000/following", {
		headers: {
			Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
		  },
		})
		  .then((res) => res.json())
		  .then(setFollowing);
	  };

const addFollowing = followingObj => {
    return fetch("http://localhost:8000/following", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
		},
		body: JSON.stringify(followingObj),
	  }).then(getFollowing);
	};

const releaseFollowing = followingId => {
    return fetch(`http://localhost:8000/following/${followingId}`, {
        method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
    },
	})
        .then(getFollowing)
}
const getFollowingById = (followingId) => {
    return fetch(`http://localhost:8000/following/${followingId}`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
	},
})
.then(res => res.json())
}

return (
    <FollowingContext.Provider value={{
        following, getFollowing, addFollowing, releaseFollowing, getFollowingById, setFollowing
    }}>
        {props.children}
    </FollowingContext.Provider>
    )
}