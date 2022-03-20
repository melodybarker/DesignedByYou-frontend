import React, { useState, useEffect,useContext } from "react"
import { CategoryContext} from "./CategoryProvider"
import "./Category.css"


export const CategoryList = (props) => {
    const [ category, setCategory] = useState([])
    const { categories, getCategories } = useContext(CategoryContext)


    useEffect(() => {
        getCategories().then(Data => setCategory(Data))
        }, [])

    return (
        <>
            <div className='categories'>
                <h2 className='categories_title'>Categories</h2>
                <ul className='categories_list'>
                    {
                        categories.map(category => {
                            return (
                                <div>
                                    {category.label}
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}