import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./dbylogo.jpg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Your Feed</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/saved">Saved</Link>
            </li>
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} alt='logo'/>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile/me">Profile</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/explore">Explore</Link>
            </li>
            {
                (localStorage.getItem("diyuser_id") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("diyuser_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}