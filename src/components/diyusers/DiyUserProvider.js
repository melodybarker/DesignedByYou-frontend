

import React, {useState, useEffect} from "react";

export const DiyUserContext = React.createContext();
export const DiyUserProvider = (props) =>{
  const [currentUser, setCurrentUser] = useState({});
  const [ user, setdiyuser ] = useState([])

  const getUsers = () => {
    return fetch("http://localhost:8000/diyusers", {
        headers: {
            Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
          },
    })
        .then(res => res.json())
        .then(setCurrentUser)
}

  const getCurrentUser = (id) => {
    return fetch(`http://localhost:8000/diyusers/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCurrentUser);
  };

  const getUserById = (userId) => {
    return fetch(`http://localhost:8000/diyusers/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
      },
    }).then((res) => res.json());
  };

  return (
    <DiyUserContext.Provider value={{user, getUsers, currentUser, setCurrentUser, getUserById, getCurrentUser}}>
      {props.children}
    </DiyUserContext.Provider>
  )
}