import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { onSnapshot,query,orderBy,collection } from "firebase/firestore";
import { db } from "../Firebase/firebase-auth";
import { useSelector } from "react-redux";
import { addDoc,serverTimestamp  } from "firebase/firestore";
const ForumDetail = () => {
    const userId = useSelector(state=>state.loginStat.username);
    const params = useParams();
    const usercomment = useRef();
    const [addcomment,setaddcomment] = useState(false);
    const [questionList,setquestionList] = useState([]);
    const [commentList,setcommentList] = useState([]);
    const id = params.qID;
    const addNewDoc = (id,enteredtext) => {
        addDoc(collection(db,`comments/Om/${id}`),{
            comment:enteredtext,
            name:"Saksham",
            createdAt:serverTimestamp(),
            sender:userId
        }).then(()=>{console.log("Successfully added")}).catch((err)=>{console.log(err)});
    };
    const submitHandler = (e) => {
        e.preventDefault();

        const enteredText = usercomment.current.value;
        addNewDoc(id,enteredText);
        setaddcomment(false);
    }
    let unSubscribe;
    const listentoDoc = async() => {
    const searchQuery = query(collection(db,'forum'),orderBy('createdAt','desc'));
    const unSubscribe = onSnapshot(searchQuery,(querySnapshot)=>{
        const messageListInt = [];
        querySnapshot.forEach((snap)=>{
            if(snap.data().id===id){
                messageListInt.push(snap.data());
            }
            });
        setquestionList(messageListInt);     
        });
    };
    let unSubscribe2;
    const listentoDoc2 = async() => {
    const searchQuery2 = query(collection(db,`comments/Om/${id}`),orderBy('createdAt','desc'));
    const unSubscribe2 = onSnapshot(searchQuery2,(querySnapshot)=>{
        const messageListInt = [];
        querySnapshot.forEach((snap)=>{
            messageListInt.push(snap.data());
        });
        setcommentList(messageListInt);     
        });
    };
    useEffect(()=>{
        listentoDoc();
        listentoDoc2();
    },[]);
    const toggleComment =() => {
        setaddcomment(prev=>{
            return !prev;
        })
    }
    return(
        <div className="forumdetail">
            {questionList.length>0 && 
            <>
                <div className="questiondiscussion">
                    <h1>{questionList[0].question}</h1>
                    <p>{questionList[0].desc}</p>
                </div>
                <div className="comments">
                    {!addcomment && <button onClick={toggleComment}>Add Comment</button>}
                    {addcomment && 
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="Enter Comment Here..." ref={usercomment}/>
                        <button onClick={toggleComment}>Cancel</button>
                        <button type="submit">Post Comment</button>
                    </form>}
                    {commentList.length>0 && commentList.map(element=><div><p>{element.userId}</p><h4>{element.comment}</h4></div>)}
                </div>
            </>
            }
        </div>
    )
};
export default ForumDetail;