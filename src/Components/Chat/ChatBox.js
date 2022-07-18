import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, setDoc, query, QuerySnapshot, orderBy, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase-auth";
import React, { useCallback, useEffect, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import './ChatBox.css';
const ChatBox = () => {
    const userId = useSelector(state=>state.loginStat.username);
    const [enteredmessage,setenteredmessage] = useState("");
    const [messageList,setmessageList] = useState([]);
    const submitHandler = (event) => {
        event.preventDefault();

        addNewDoc(enteredmessage);
        setenteredmessage("");
    }
    const changeHandler = (e) => {
        setenteredmessage(e.target.value);
    }
    const params = useParams();
    console.log(params.unit);
    const address = collection(db,params.unit);
    const addNewDoc = (enteredtext) => {
        addDoc(address,{
            message:enteredtext,
            name:"Saksham",
            createdAt:serverTimestamp(),
            sender:userId
        }).then(()=>{console.log("Successfully added")}).catch((err)=>{console.log(err)});
    } 
    let unSubscribe;
    const listentoDoc = async() => {
        const searchQuery = query(collection(db,params.unit),orderBy('createdAt'));
        const unSubscribe = onSnapshot(searchQuery,(querySnapshot)=>{
            const messageListInt = [];
            querySnapshot.forEach((snap)=>{
                messageListInt.push(snap.data());
                });
            setmessageList(messageListInt);
            });
    };
    useEffect(()=>{
        listentoDoc();
    },[]);
    return(
        <div>
            <h1>This is the Chat Box!</h1>
            <ul>
                {messageList.length>0 && messageList.map(msg => <Message val={msg}/>)}
            </ul>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={changeHandler} value={enteredmessage} placeholder="Enter Message..."/>
                <button type="submit">Click</button>
            </form>
        </div>
    );
}

export default ChatBox;