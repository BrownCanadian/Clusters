import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useState,useEffect } from "react";
import { onSnapshot,collection,query,orderBy } from "firebase/firestore";
import { db } from "../Firebase/firebase-auth";
import QuestionCard from "./QuestionCard";
const Forums = () => {
    const [questionList,setquestionList] = useState([]);
    let unSubscribe;
    const listentoDoc = async() => {
    const searchQuery = query(collection(db,'forum'),orderBy('createdAt','desc'));
    const unSubscribe = onSnapshot(searchQuery,(querySnapshot)=>{
        const messageListInt = [];
        querySnapshot.forEach((snap)=>{
            messageListInt.push(snap.data());
            });
        setquestionList(messageListInt);     
        });
    };
    useEffect(()=>{
        listentoDoc();
    },[]);
    return (
        <div className="forum">
            <h1>This is the Q&A Forum!</h1>
            <NavLink to='/AddQuestion'>Ask a Question!</NavLink>
            {questionList.length>0 && questionList.map(ques=><QuestionCard val={ques}/>)}
        </div>
    );
}

export default Forums;