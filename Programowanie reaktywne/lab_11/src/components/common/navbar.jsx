import React from "react";
import {Link} from "react-router-dom";
import {isExpired, decodeToken} from "react-jwt";

const Navbar = () => {

    const account = decodeToken(localStorage.getItem('token'))
    const isLoggedOut = isExpired(localStorage.getItem('token'))

    const handleLogOut = () =>{
        localStorage.removeItem('token');
    }

    return (
        <div>
            {account && <h4 style={{float: "right"}}>Hi <span style={{fontWeight: "bolder", fontStyle: "italic"}}>{account.name}</span>!</h4>}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link to="/home" className="nav-link" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true">Home</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/posts" className="nav-link" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true">Posts</Link>
                    </li>
                    { isLoggedOut && <li className="nav-item" role="presentation">
                        <Link to="/login" className="nav-link" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true">Login</Link>
                    </li>}
                    { isLoggedOut && <li className="nav-item" role="presentation">
                        <Link to="/signup" className="nav-link" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true">Sign up</Link>
                    </li>}

                    { !isLoggedOut && <li className="nav-item" role="presentation">
                        <a href="/" className="nav-link" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true" onClick={handleLogOut}>Log out</a>
                    </li>}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;
