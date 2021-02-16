import React, {useEffect} from "react";
import "./Event.css"


const SeasonEvent = ({name, short, clicked}) => {


    useEffect(() => {
        console.log('[SeasonEvent]:: useEffect');
    })


    return (
        <article className="Event" onClick={clicked}>
            <h4>{short} </h4>
            <div className="Info">
                <div className="EventName">{name} </div>
            </div>
        </article>
    );
}
export default SeasonEvent;
