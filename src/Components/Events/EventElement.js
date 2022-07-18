const EventElement = (props) => {
    const current = new Date();
    let date;
    if(current.getMonth()+1<10){
        date = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;
    }else{
        date = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;
    }
    return(
        <>
        {/* <h1>EVENTS TODAY</h1> */}
            {props.val.eventDate===date && <div className="eventelement__today">
                <img src={`${props.val.posterURL}`}/>
                <h1>{props.val.eventName}</h1>
                <p>{props.val.eventDesc}</p>
                <h4>{props.val.eventVenue}</h4>
                <h3>{props.val.eventDate}</h3>
                <h3>{props.val.eventTime}</h3>
                <h4>{props.val.sender}</h4>
            </div>}
        {/* <h1>EVENTS COMING UP</h1> */}
            <div className="eventelement__future">
            {props.val.eventDate!==date && <div className="eventelement__today">
            <img src={`${props.val.posterURL}`}/>
                <h1>{props.val.eventName}</h1>
                <p>{props.val.eventDesc}</p>
                <h4>{props.val.eventVenue}</h4>
                <h3>{props.val.eventDate}</h3>
                <h3>{props.val.eventTime}</h3>
                <h4>{props.val.sender}</h4>
            </div>}
            </div>
        </>
    )
};

export default EventElement;