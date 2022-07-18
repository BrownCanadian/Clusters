import './Header.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import {db, storage} from '../Firebase/firebase-auth';
import { ref,uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
const Header = () => {
    const [ImageUpload,setImageUpload] = useState(null);
    const submitHandler =(e) => {
        e.preventDefault();
        if(ImageUpload!=null){
            const imageRef = ref(storage,`moments/${ImageUpload.name}`);
            uploadBytes(imageRef,ImageUpload).then(()=>{
                alert("Uploaded!");

            getDownloadURL(imageRef).then((url)=>{
                const address = collection(db,'moments');
                addDoc(address,{
                channel:"Saksham",
                dp:"None",
                likes:4500,
                createdAt:serverTimestamp(),
                // sender:userId,(SHould be added to identufy the uploader)
                url:url
            }).then(()=>{console.log("Successfully added")}).catch((err)=>{console.log(err)});
            })
        });
        }
        // We can add a document to the moments in the firestore!
        // const address = collection(db,'moments');
        //     addDoc(address,{
        //         message:enteredtext,
        //         name:"Saksham",
        //         createdAt:serverTimestamp(),
        //         sender:userId
        //     }).then(()=>{console.log("Successfully added")}).catch((err)=>{console.log(err)});
    }
    return(
        <div className='header'>
            <form onSubmit={submitHandler} className='inputfield'>
                {/* <ArrowBackIosIcon /> */}
                <input type="file" onChange={event => {
                    setImageUpload(event.target.files[0])
                }}></input>
                <button type='submit'>Upload</button>
                {/* <AddIcon/> */}
            </form>
        </div>
    );
};
export default Header;