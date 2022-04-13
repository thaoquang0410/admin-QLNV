import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../../asset/css/NotFound.css'
import pagenotfoundImage from "../../asset/images/pagenotfound.png";
const NotFound = () => {
    return (
        <div className="pageNotFound">
            <h1>Oops..! 404 Page Not Found</h1>
            <p>Looks like you came to wrong page on our server</p>
            <img src={pagenotfoundImage} height="500" width="500" alt="not found" />
            <div>
                <Link className="back_to_home" to="/">Back to Home</Link>
            </div>
        </div>
    )
}
export default NotFound;
