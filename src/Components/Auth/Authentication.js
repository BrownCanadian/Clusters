import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase-auth";
import './Authentication.css';
import { useDispatch } from "react-redux";
import { LoginActions } from "../../Store/LoginStatus";
const Auth = () => {
    const [signupState,setsignupState] = useState(false);
    const emailref = useRef('');
    const passwordref = useRef('');
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailref.current.value;
        const enteredPassword = passwordref.current.value;
        if(signupState){
            SignUp(enteredEmail,enteredPassword);
        }else{
            LogIn(enteredEmail,enteredPassword);
        }
    }
    const signUpHandler = () => {
        setsignupState((prevState)=>{
            return !prevState;
        });
    }
    const SignUp = async (email,password) => {
        try{
            const User = await createUserWithEmailAndPassword(auth,email,password);
            console.log(User);
            dispatch(LoginActions.login());
            dispatch(LoginActions.setusername(auth.currentUser.email));
        }catch(error){
            console.log(error.message);
        }
    }
    const LogIn = async (email,password) => {
        try{
            const User = await signInWithEmailAndPassword(auth,email,password);
            console.log(User);
            dispatch(LoginActions.login());
            dispatch(LoginActions.setusername(auth.currentUser.email));
        }catch(error){
            console.log(error);
        }
    }
    const logout = async () => {
        await signOut(auth);
    }
    return(
    <div className="login_form">
        <form onSubmit={submitHandler}>
            <h1>Welcome to Clusters!</h1>
            {!signupState && 
            <div className="User_Login">
                <h3>LOG IN</h3>
                <input type="text" ref={emailref} placeholder="Enter E-Mail"/>
                <input type="text" ref={passwordref} placeholder="Enter Password"/>
                <button type="submit">Submit</button>
                <button onClick={signUpHandler}>New User? Sign Up</button>
            </div>
            }
            {signupState &&
            <div className="User_SignUp">
                <h3>SIGN UP</h3>
                <p>We are Happy to Have You!</p>
                <input type="text" ref={emailref}  placeholder="Enter E-Mail"/>
                <input type="text" ref={passwordref}  placeholder="Enter Password"/>
                <button type="submit">Submit</button>
                <button onClick={signUpHandler}>Existing User? Log In</button>
            </div>}
        </form>
    </div>);
};

export default Auth;