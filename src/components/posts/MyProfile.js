// import React, { useEffect, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { PostContext } from "./PostProvider.js";
// import "./Post.css";

// export const ExploreList = (props) => {
//   const history = useHistory();
//   const { posts, getPosts, updatePost, deletePost } = useContext(PostContext);
//   const userId = parseInt(localStorage.getItem("diyuser_pk"));

//   useEffect(() => {
//     getPosts();
//   }, []);

//   const handleRelease = (id) => () => {
//     deletePost(id).then(() => {
//       window.location.reload();
//     });
//   };

//   return (
//     <article className="post_list">
//       <header className="post_header">
//         <h2>My Feed</h2>
//       </header>
//       {posts.map((p) => {
//         if (p.diyuser.id === userId) {
//           return (
//             <section className="ind_post" key={p.id} id={`post--${p.id}`}>
//               <div className="post_title">
//                 <b>{p.title}</b>
//               </div>
//               Post by&nbsp;
//               <Link className="post_user" to={`/profile/$`}>
//                 {p.diyuser?.user.first_name} {p.diyuser?.user.last_name}
//               </Link>
//               <div className="post_date" style={{ fontSize: "10px" }}>
//                 {p.date}
//               </div>
//               <Link to={`/posts/${p.id}`}>
//                 <img src={p.image_url} width="500px" height="350px" />
//               </Link>
//               <button
//                 className="edit_post"
//                 style={{ fontSize: "10px" }}
//                 onClick={() => {
//                   history.push(`/posts/edit/${p.id}`);
//                 }}
//                 hidden={p.diyuser.id === userId ? "" : "hidden"}
//               >
//                 Edit Post
//               </button>
//               &nbsp;
//               <button
//                 className="delete_post"
//                 style={{ fontSize: "10px" }}
//                 onClick={handleRelease(p.id)}
//                 hidden={p.diyuser.id === userId ? "" : "hidden"}
//               >
//                 Delete Post
//               </button>
//             </section>
//           );
//         }
//       })}
//     </article>
//   );
// };
