import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from "../Firebase/firebase-auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const AddQuestion = () => {
    const [goBack,setgoBack] = useState(false);
    const userId = useSelector(state=>state.loginStat.username);
    const question = useRef('');
    const descreption = useRef('');
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredQuestion  = question.current.value;
        const enteredDesception = descreption.current.value;

        const address = collection(db,'forum');
        addDoc(address,{
            question:enteredQuestion,
            desc:enteredDesception,
            name:"Saksham",
            createdAt:serverTimestamp(),
            sender:userId,
            id:Math.random()+enteredQuestion[0]+enteredQuestion[3]+userId[2]+userId[1]+Math.random()
        }).then(()=>{
            console.log("Successfully added");

        }).catch((err)=>{console.log(err)});
        setgoBack(true); 
    }
    return(
        <div className="Question Form">
            <form onSubmit={submitHandler}>
                <div>
                    <label>Enter Question</label>
                    <input type="text" ref={question}/>
                </div>
                <div>
                    <label>Describe (any further elaboration) the question entered</label>
                    <textarea rows="5" ref={descreption}/>
                </div>
                <div>
                    <button type="submit">Post Question</button>
                </div>
                {goBack && <Redirect to='/Forum'/>}
            </form>
        </div>
    )
};

export default AddQuestion;