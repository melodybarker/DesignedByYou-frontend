import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { DBY } from "./components/DBY.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <DBY />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
