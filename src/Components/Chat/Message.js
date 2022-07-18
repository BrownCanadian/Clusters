import { useSelector } from "react-redux";

const Message = (props) => {
    const user = useSelector(state=>state.loginStat.username);
    console.log(user===props.val.sender);
    return props.val.sender===user ? <h1 className="right">{props.val.message}</h1> : <h1 className="left">{props.val.message}</h1>;
};
export default Message;