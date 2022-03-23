import React from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/about">О нас</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
}

export default Navbar;