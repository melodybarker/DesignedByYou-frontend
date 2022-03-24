import React, { useEffect, useContext } from "react"

import { ProfileContext } from "./AuthProvider.js"

export const Profile = (props) => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                    Welcome: {profile.diyuser && profile.diyuser.user.first_name} {profile.diyuser && profile.diyuser.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.diyuser && profile.diyuser.user.username}</div>
                <div className="profile__bio">About you: {profile.diyuser && profile.diyuser.bio}</div>
            </section>
            <section className="profile__posts">
                <header className="posts__header">
                    <h3>Your Posts</h3>
                </header>

            </section>
        </article>
    )
}