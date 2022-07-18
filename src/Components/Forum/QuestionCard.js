import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './QuestionCard.css';
const QuestionCard = (props) => {
    const id = props.val.id;
    return(
        <div className="quesCard">
            <p>{props.val.sender}</p>
            <NavLink to={`/Forum/${id}`}><h1>{props.val.question}</h1></NavLink>
        </div>
    );
};

export default QuestionCard;