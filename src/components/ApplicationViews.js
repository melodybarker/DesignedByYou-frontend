import React from "react";
import { Route, Router } from "react-router-dom";
import { PostProvider } from "./posts/PostProvider"
import { ExploreList } from "./posts/ExploreList"
import { MyPosts } from "./posts/MyProfile"

export const ApplicationViews = () => {
    return <>
        <main style={{
        margin: "5rem 2rem",
        lineHeight: "1.75rem"
    }}>
    <PostProvider>
        <Route exact path="/myprofile">
            <MyPosts/>
        </Route>
        <Route exact path="/explore">
            <ExploreList />
        </Route>
    </PostProvider>

    </main>
    </>
}