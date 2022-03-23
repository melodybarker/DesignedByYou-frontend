import React, { useEffect, useContext } from "react"
import { EventContext } from "../event/EventProvider.js"
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
                <div className="posts">
                    {
                        profile.diyuser && profile.diyuser.posts.map(post => {
                            return <section key={`post--${post.id}`} className="post">
                                <div className="post__title">{post.title} by {post.diyuser.user.first_name} {post.diyuse.user.last_name</div>
                                <div className="post__content">{post.content}</div>
                                <div className="post__comment">comments {post.comment.content}</div>
                                <button className="btn btn-4"
                                    onClick={() => props.history.push(`/posts/${post.id}/edit`)}
                                >Edit</button>
                            </section>
                        })
                    }
                </div>
            </section>
        </article>
    )
}