import { useRef, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { db,storage } from "../Firebase/firebase-auth";
import { ref,uploadBytes } from 'firebase/storage';
import { getDownloadURL } from "firebase/storage";
import { collection,serverTimestamp,addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
const NewEvent = () => {
    const userId = useSelector(state=>state.loginStat.username);
    const [fileUpload,setFileUpload] = useState(null);
    const [goBack,setgoBack] = useState(false);
    const nameRef = useRef('');
    const descRef = useRef('');
    const dateRef = useRef();
    const venueRef = useRef('');
    const timeRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredDesc = descRef.current.value;
        const enteredDate = dateRef.current.value;
        const enteredVenue = venueRef.current.value;
        const enteredTime = timeRef.current.value;
        
        if(fileUpload!=null){
            const imageRef = ref(storage,`events/${enteredName+enteredTime+Math.random()}`);
            uploadBytes(imageRef,fileUpload).then(()=>{
                alert("Uploaded!");

            getDownloadURL(imageRef).then((url)=>{
                const address = collection(db,'events');
                addDoc(address,{
                    eventName:enteredName,
                    eventDesc:enteredDesc,
                    eventVenue:enteredVenue,
                    eventDate:enteredDate,
                    eventTime:enteredTime,
                    posterURL:url,
                    name:"Saksham",
                    createdAt:serverTimestamp(),
                    sender:userId
                }).then(()=>{
                    console.log("Successfully added");
                    setgoBack(true);
                }).catch((err)=>{console.log(err)});
            })
        });
        }
    }
    return(
        <div className="newevent">
            <h1>New Event!</h1>
            <form onSubmit={submitHandler}>
                <label>Event Name</label>
                <input type="text" ref={nameRef}/>
                <label>Descreption</label>
                <textarea row="5" ref={descRef}/>
                <label>Poster</label>
                <input type="file" onChange={input=>{
                    setFileUpload(input.target.files[0])
                }}/>
                <label>Venue</label>
                <input type="text" ref={venueRef}/>
                <label>Date</label>
                <input type="date" ref={dateRef}/>
                <label>Time</label>
                <input type="time" ref={timeRef}/>
                <button type="submit">Post Event</button>
            </form>
            {goBack && <Redirect to='/Events'/>}
        </div>
    )
};

export default NewEvent;