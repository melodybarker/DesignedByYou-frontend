import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { DiyUserContext } from "./DiyUserProvider"
import { FollowingContext } from "../following/FollowingProvider"


export const DiyUserId = () => {
    const { diyuser, getUserById } = useContext(DiyUserContext)
    const { following, addFollowing, getFollowing } = useContext(FollowingContext)
    const { userId }= useParams()
    const history = useHistory()
    const user_id = parseInt(localStorage.getItem("diyuser_pk"));
    const [user, setUser] = useState({})


    useEffect(() => {
        getUserById(userId)

    }, [])

    const handleFollow = (e) => {
        const diyuserId = parseInt(userId)
        const newFollowing = {
            to_diyuser: diyuserId,
            from_diyuser: user_id
        }
        // addFollowing(newFollowing)
        // .then(() => {
        //     history.push("/")
        // })
        console.log(newFollowing)
    }

    return (
        <>
            <div className="profileDiv">
                <section className="users">
                    <h2 className="user-group"><b>{following.diyuser?.user?.first_name}'s Profile View:</b></h2>
                    <div><img style={{height: '150px', margin: '10px 0px'}} src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png" alt="profile pic"/></div>
                    <div className="user_name"><b>Name: </b>{following.from_diyuser?.user?.first_name} {following.from_diyuser?.user?.last_name}</div>
                    <div className="user_email"><b>Email: </b>{following.diyuser?.user?.email}</div>
                    <button id={following.id} onClick={handleFollow}>
                    {following.from_diyuser?.id === user_id ? <div style={{color: 'Red'}}>Unfollow</div> : <div style={{color: 'blue'}}>Follow</div>}</button>

                </section>
            </div>
        </>
    );
};