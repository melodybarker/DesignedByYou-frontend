import React, {useState, useEffect} from "react";

export const DiyUserContext = React.createContext();
export const DiyUserProvider = (props) =>{
  const [currentUser, setCurrentUser] = useState({});
  const [ diyuser, setdiyuser ] = useState([])

  const getUsers = () => {
    return fetch("http://localhost:8000/diyusers", {
        headers: {
            Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
          },
    })
        .then(res => res.json())
        .then(setCurrentUser)
}

  const getCurrentUser = () => {
    return fetch("http://localhost:8000/diyusers/me", {
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCurrentUser);
  };

  const getUserById = (userId) => {
    return fetch(`http://localhost:8000/profile/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
      },
    }).then((res) => res.json());
  };

  return (
    <DiyUserContext.Provider value={{diyuser, getUsers, currentUser, setCurrentUser, getUserById, getCurrentUser,currentUser}}>
      {props.children}
    </DiyUserContext.Provider>
  )
}