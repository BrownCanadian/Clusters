import React from "react";
import { NavLink } from "react-router-dom";
import './Welcome.css';
const Welcome = () => {
    return(
    <div className="homepage">
        <h1>Welcome Home!</h1>
        <div className="links">
            <NavLink to="/ChatRoomAuth">Chat Rooms</NavLink>
            <NavLink to="/Moments">Moments</NavLink>
            <NavLink to="/Events">Events</NavLink>
            <NavLink to="/Forum">Q&A Forum</NavLink>
        </div>
    </div>);
}

export default Welcome;