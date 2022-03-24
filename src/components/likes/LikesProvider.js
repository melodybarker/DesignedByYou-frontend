import React, {useState, createContext} from "react";

export const LikesContext = createContext();

export const LikesProvider = (props) => {
    const [likes, setLikes] = useState([])

    const getLikes = () => {
        return fetch("http://localhost:8000/likes", {
		headers: {
			Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
		  },
		})
		  .then((res) => res.json())
		  .then(setLikes);
	  };

const addLikes = likesObj => {
    return fetch("http://localhost:8000/likes", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
		},
		body: JSON.stringify(likesObj),
	  }).then(getLikes);
	};

const releaseLikes = likesId => {
    return fetch(`http://localhost:8000/likes/${likesId}`, {
        method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
    },
	})
        .then(getLikes)
}
const getLikesById = (likesId) => {
    return fetch(`http://localhost:8000/likes/${likesId}`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
	},
})
.then(res => res.json())
}

return (
    <LikesContext.Provider value={{
        likes, getLikes, addLikes, releaseLikes, getLikesById, setLikes
    }}>
        {props.children}
    </LikesContext.Provider>
    )
}