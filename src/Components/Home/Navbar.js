import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
    return(
    <nav className="NavBar_main">
        <NavLink to="/">Home</NavLink>
        {/* Think about the functions or features you want to add to the project! */}
    </nav>);
};

export default Navbar;