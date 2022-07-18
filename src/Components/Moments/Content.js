import { useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Content.css';
const Content = (props) => {
    const [isplaying,setisplaying] = useState(false);
    console.log(props);
    const vidref = useRef(null);
    const playpausemanager = () => {
        if(isplaying){
            vidref.current.pause();
            setisplaying(false);
        }else{
            vidref.current.play();
            setisplaying(true);
        }
    };
    return(
    <div className="content">
        <Header/>
        <video className='content__video' ref={vidref} onClick={playpausemanager} src={props.val.url} alt='moment video error :/' loop/>
        <Footer channel={props.val.channel} dp={props.val.dp} likes={props.val.likes} song="Demo SOng"/>
    </div> 
    );
};
export default Content;