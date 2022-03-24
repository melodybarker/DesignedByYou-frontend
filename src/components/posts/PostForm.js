import React, {useState, useEffect, useContext} from "react";
import { useParams, useHistory } from "react-router";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../categories/CategoryProvider"
import "./Post.css";

export const PostForm = () => {
  const [category, setCategories] = useState([])
  const { posts, addPost, updatePost, getPostById } = useContext(PostContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const {postId} = useParams()
  const history = useHistory()
  const editMode = postId ? true : false

  const [post, setPost] = useState({
    title: "",
    category: 0,
    date: Date.now(),
    image_url: "",
    content: ""
  })

	useEffect(() => {
		getCategories().then(() => {
			if(postId) {
				getPostById(parseInt(postId))
				.then(post => {
                    post.category = post.category.id
					setPost(post)
				})
                console.log(post)
			}
		})
	}, [])

  const handleInputChange = (e) => {

  const newPost = { ...post }
  newPost[e.target.id] = e.target.value;
	setPost(newPost)
	}
  const createNewPost = () => {
    const category_id = parseInt(post.category)

      if (editMode) {
        updatePost({
        id: post.id,
          title: post.title,
          category: category_id,
          date: post.date,
          image_url: post.image_url,
          content: post.content,
          diyuser: parseInt(localStorage.getItem("diyuser_pk"))
        })
          .then (() => history.push("/posts"))

      } else {
        addPost({
          title: post.title,
          category: category_id,
          date: new Date(),
          image_url: post.image_url,
          content: post.content,
          diyuser: parseInt(localStorage.getItem("diyuser_pk"))

        })
          .then (() => history.push("/myposts"))
      }

  }

  return (
    <form className="postForm">
      <h2 className="postForm__title">{editMode ? "Edit Post" : "Add Post"}</h2>
      <fieldset>
        <div className="form_group">
          <label htmlFor="title"> Post Title: </label>
          <input type="text" id="title" key="title" name="title"  className="form-control"
          placeholder="Post title"
          value={post.title}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="image_url"> Image URL: </label>
          <input type="text" id="image_url" nkey= "image_url" name="image_url"  className="form-control"
          placeholder="Image Url"
          value={post.image_url}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="content"> Content: </label>
          <input type="text" name="content" key="content" id="content" className="form-control"
          placeholder="Post content"
          value={post.content}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="category"> Category: </label>
          <select name="category" key="category" className="form-control" id="category" placeholder="pick"
            value={post.category}
            onChange={handleInputChange}>
            <option value="0">Select a category...</option>
						{categories.map((c) => {
							return (

                <option id="category" name="category" onChange={handleInputChange} key={c.id} value={c.id}>
                    {c.label}
                  </option>
						)})}
            </select>
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          createNewPost()
        }}
        className="bt btn-primary">
        {editMode ? "Save Changes" : "Create Post"}
      </button>
    </form>
  )
}