import React, { useRef } from "react";

const ChatRoomAuth = (props) => {
    const clusternumber = useRef('');
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredcluster = clusternumber.current.value;
        props.clusternumber(enteredcluster);
    }
    return (
    <div className="Chat_Login">
        <h1>This is the Chat Room Auth</h1>
        <div className="login_box">
            <form onSubmit={submitHandler}>
                <label>Enter Cluster Unit : </label>
                <input type="text" ref={clusternumber} placeholder="46, 47, 48, etc"/>
                <button type="submit">Enter Chat</button>
            </form>
        </div>
    </div>);
};

export default ChatRoomAuth;