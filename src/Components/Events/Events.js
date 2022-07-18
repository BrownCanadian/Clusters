import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EventElement from "./EventElement";
import { onSnapshot,query,collection } from "firebase/firestore";
import { db } from "../Firebase/firebase-auth";
import { useState, useEffect } from "react";
const Events = () => {
    const [eventsList,seteventsList] = useState([]);
    let unSubscribe;
    const listentoDoc = async() => {
    const searchQuery = query(collection(db,'events'));
    const unSubscribe = onSnapshot(searchQuery,(querySnapshot)=>{
        const messageListInt = [];
        querySnapshot.forEach((snap)=>{
            messageListInt.push(snap.data());
            });
        seteventsList(messageListInt);    
        });
};
useEffect(()=>{
    listentoDoc();
},[]);
    return(
        <div className="events_page">
            <h1>EVENTS</h1>
            <NavLink to='/NewEvent'>Add Event</NavLink>
            {eventsList.length>0 && eventsList.map(event=><EventElement val={event}/>)}
        </div>
    );
};
export default Events;