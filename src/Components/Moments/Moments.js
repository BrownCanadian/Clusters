import "./Moments.css";
import { useEffect, useState } from "react";
import Content from "./Content";
import { db } from "../Firebase/firebase-auth";
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, setDoc, query, QuerySnapshot, orderBy, Timestamp, serverTimestamp } from "firebase/firestore";
const Moments = (props) => {
  const [moments,setmoments] = useState([null]);
  let unSubscribe;
  const listentoDoc = async() => {
    const searchQuery = query(collection(db,'moments'));
    const unSubscribe = onSnapshot(searchQuery,(querySnapshot)=>{
        const messageListInt = [];
        querySnapshot.forEach((snap)=>{
            messageListInt.push({data:snap.data(),Id:snap.id});
            });
        setmoments(messageListInt);     
        });
};
useEffect(()=>{
    listentoDoc();
},[]);
  return (
    <div>
      <div className="Bganimate">
        <ul className="circlearea" >
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
        </ul>
    </div>
    <div className="moments">
      <div className="moments__top">
        <h1>MOMENTS</h1>
        {/* <input type="file"/> */}
      </div>
      <div className="moments__content">
        {/* <Content
          channel="dummyname"
          dp=""
          song="test song -- by me"
          url="https://ak.picdn.net/shutterstock/videos/1088005579/preview/stock-footage-vertical-screen-stylish-diverse-multiethnic-couple-in-cozy-clothes-recording-a-dance-video-from-a.mp4"
          likes={950}
        /> */}
        {(moments.length>0 && moments[0]!==null) && moments.map(el => <Content val={el.data} ID={el.Id}/>)}
        {/* channel={el.channel} dp={el.dp} url={el.url} song="shit" likes={el.likes} */}
        {/* <Content />
        <Content /> */}
        {/* Video */}
        {/* Video */}
      </div>
    </div>
    </div>
  );
};
export default Moments;
