import './Footer.css';
import { Button,Avatar } from '@material-ui/core';
import { Favorite, ModeComment, MoreHoriz } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../Firebase/firebase-auth';
const Footer = ({likes,dp,channel,song,id}) => {
    const user = useSelector(state=>state.loginStat.username);
    const [liked,setliked] = useState(likes.find(el => el===user)!==undefined);
    const addLike = () => {
        const docRef = doc(db,'moments',id);
        updateDoc(docRef,{
            likes:arrayUnion(user)
        });
        setliked(true);
    };
    const removeLike = () => {
        const docRef = doc(db,'moments',id);
        updateDoc(docRef,{
            likes:arrayRemove(user)
        });
        setliked(false);
    };
    return(
        <div className='Footer'>
            <div className='contentFooter'>
                <Avatar src={dp} className='Avatar'/>
                <h3>{channel}</h3>
            </div>
            <div className='content__actions'>
                <div className='content__actionsleft'>
                    {!liked && <button className='likebutton' onClick={addLike}><Favorite fontSize="large" className='fav'/></button>}
                    {liked && <button className='likebutton' onClick={removeLike}><Favorite fontSize="large" className='liked'/></button>}
                    <ModeComment fontSize="large" className='fav'/>
                    <MoreHoriz fontSize='large' className='fav'/>
                </div>
                <div className='content__actionsright'>
                    <div className='content__stat'>
                        <Favorite />
                        <p>{likes.length}</p>
                    </div>
                    {/* Share or Comment feature can be added! */}
                    {/* <div className='content__stat'>
                        
                    </div> */}
                </div>
            </div>
        </div>
    )
};
export default Footer;