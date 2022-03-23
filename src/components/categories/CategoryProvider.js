import React, {useState, createContext} from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
        },
    })
    .then((res) => res.json())
    .then(setCategories)
}

//     const addCategory = newCategory => {
//     return fetch("http://localhost:8000/categories", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${localStorage.getItem("diyuser_id")}`,
//         },
//         body: JSON.stringify(newCategory)
//     })
//         .then(getCategories)
// }

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("diyuser_id")}`
            }
        })
        .then(res => res.json())
    }

    return (
            <CategoryContext.Provider value={{
            categories, getCategories, getCategoryById }}>
            {props.children}
            </CategoryContext.Provider>
    )
}