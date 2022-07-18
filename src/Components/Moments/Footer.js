import './Footer.css';
import { Button,Avatar } from '@material-ui/core';
import { Favorite, ModeComment, MoreHoriz } from '@material-ui/icons';
const Footer = ({likes,dp,channel,song}) => {
    return(
        <div className='Footer'>
            <div className='contentFooter'>
                <Avatar src={dp} className='Avatar'/>
                <h3>{channel}</h3>
            </div>
            <div className='content__actions'>
                <div className='content__actionsleft'>
                    <Favorite fontSize="large" className='fav'/>
                    <ModeComment fontSize="large" className='fav'/>
                    <MoreHoriz fontSize='large' className='fav'/>
                </div>
                <div className='content__actionsright'>
                    <div className='content__stat'>
                        <Favorite />
                        <p>{likes}</p>
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