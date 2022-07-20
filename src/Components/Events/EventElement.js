import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Firebase/firebase-auth";

const EventElement = (props) => {
    const user = useSelector(state=>state.loginStat.username);
    const [attending,setattending] = useState(props.val.attendance.find(el => el===user)!==undefined);
    const updateAtt = () => {
        const docRef = doc(db,'events',props.id);
        updateDoc(docRef,{
            attendance: arrayUnion(user)
        });
        setattending(true);
    };
    const removeAtt = () => {
        const docRef = doc(db,'events',props.id);
        updateDoc(docRef,{
            attendance: arrayRemove(user)
        });
        setattending(false);
    }
    const current = new Date();
    let date;
    if(current.getMonth()+1<10){
        date = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;
    }else{
        date = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;
    }
    return(
        <>
        {/* <h1>EVENTS TODAY</h1> */}
            {props.val.eventDate===date && <div className="eventelement__today">
                <img src={`${props.val.posterURL}`}/>
                <h1>{props.val.eventName}</h1>
                <p>{props.val.eventDesc}</p>
                <h4>{props.val.eventVenue}</h4>
                <h3>{props.val.eventDate}</h3>
                <h3>{props.val.eventTime}</h3>
                <h4>{props.val.sender}</h4>
                <h2>{props.val.attendance.length} are attending this event!</h2>
                {!attending && <button onClick={updateAtt}>ATTEND!</button>}
                {attending && <button onClick={removeAtt}>Not Intersted Anymore!</button>}


            </div>}
        {/* <h1>EVENTS COMING UP</h1> */}
            <div className="eventelement__future">
            {props.val.eventDate!==date && <div className="eventelement__today">
            <img src={`${props.val.posterURL}`}/>
                <h1>{props.val.eventName}</h1>
                <p>{props.val.eventDesc}</p>
                <h4>{props.val.eventVenue}</h4>
                <h3>{props.val.eventDate}</h3>
                <h3>{props.val.eventTime}</h3>
                <h4>{props.val.sender}</h4>
                <h2>{props.val.attendance.length} are attending this event!</h2>
                {!attending && <button onClick={updateAtt}>ATTEND!</button>}
                {attending && <button onClick={removeAtt}>Not Intersted Anymore!</button>}
            </div>}
            </div>
        </>
    )
};

export default EventElement;