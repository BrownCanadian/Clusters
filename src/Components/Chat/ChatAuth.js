import React, { useRef } from "react";
import './ChatAuth.css';
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
const ChatRoomAuth = (props) => {
    const clusternumber = useRef('');
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredcluster = clusternumber.current.value;
        props.clusternumber(enteredcluster);
    }
    return (
        
    <div>
         <div className="Bganimate">
        <ul className="circlearea" >
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
        </ul>
        </div>
   
    <div className="Chat_Login">
        <h1 className="LoginTitle">CHAT ROOM AUTH</h1>
        <div className="login_box">
            <form onSubmit={submitHandler}>
                <list className="ListIcon">
                <li ><label className="EnetrInfo">Enter Unit No. </label></li>
                <li ><input type="text" className="InputBox" ref={clusternumber} placeholder="46, 47, 48, etc"/></li>
                <li > <button type="submit" className="SubmitButton">join</button></li>
                </list>
            </form>
        </div>
    </div>
   
    </div>
    );
};

export default ChatRoomAuth;