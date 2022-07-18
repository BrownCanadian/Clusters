import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
//This Information is very Sensitive and should not be uploaded/posted anywhere, not to be uploaded on GitHub!
const firebaseConfig = {
    apiKey: "AIzaSyBlTzVM6b356c0fB3ApAz5WT6cDPS3GrVw",
    authDomain: "clusters-ad70f.firebaseapp.com",
    projectId: "clusters-ad70f",
    storageBucket: "clusters-ad70f.appspot.com",
    messagingSenderId: "561737818585",
    appId: "1:561737818585:web:4f6d1a32f3c6e7bee5b9c8",
    measurementId: "G-WX9F7GKG3W"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth(app);
