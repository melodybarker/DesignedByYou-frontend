import React from "react";
import { Route, Router } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider"
import { CommentProvider } from "./comments/CommentProvider"
import { DiyUserProvider } from "./diyusers/DiyUserProvider"
import { DiyUserId } from "./diyusers/DiyUserId"
import { DiyUserList } from "./diyusers/DiyUserList"
import { FollowingProvider } from "./following/FollowingProvider"
import { FollowingList } from "./following/FollowingList"
import { LikesProvider } from "./likes/LikesProvider"
import { LikesList } from "./likes/LikesList"
import { PostProvider } from "./posts/PostProvider"
import { PostDetail } from "./posts/PostDetail"
import { ExploreList } from "./posts/ExploreList"
import { PostForm } from "./posts/PostForm"
import { Profile } from "./auth/Profile"
import { ProfileProvider } from "./auth/AuthProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
        margin: "5rem 2rem",
        lineHeight: "1.75rem"
    }}>
    <ProfileProvider>
    <CategoryProvider>
    <CommentProvider>
    <PostProvider>
    <LikesProvider>
    <FollowingProvider>
    <DiyUserProvider>
        <Route exact path="/">
            <FollowingList />
        </Route>
        <Route exact path="/saved">
            <LikesList />
        </Route>
        <Route exact path="/posts/create">
            <PostForm />
        </Route>
        <Route path="/posts/:postId(\d+)">
            <PostDetail />
        </Route>
        <Route path="/posts/edit/:postId(\d+)">
            <PostForm />
        </Route>
        <Route exact path="/profile/me">
            <DiyUserList />
        </Route>
        <Route exact path="/profiles/:userId(\d+)">
            <DiyUserId />
        </Route>
        <Route exact path="/explore">
            <ExploreList />
        </Route>
    </DiyUserProvider>
    </FollowingProvider>
    </LikesProvider>
    </PostProvider>
    </CommentProvider>
    </CategoryProvider>
    </ProfileProvider>

    </main>
    </>
}