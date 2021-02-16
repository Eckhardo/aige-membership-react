import React, {useState} from "react";
import {Link} from "react-router-dom";
import EventSingle from "./EventSingle";


const EventCollection = (props) => {

    const [currentEvent, setCurrentEvent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(-1);

    const setActiveEvent = (myEvent, index) => {
        setCurrentEvent(myEvent);
        setCurrentIndex(index);

    }

    return (
        <>
            <div className="col-md-6">
                <h4>Seasons List</h4>
                <ul className="list-group">
                    {props.events && props.events.map((myEvent, index) => (
                        <li key={myEvent.event_short}
                            className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveEvent(myEvent, index)}>
                            {myEvent.event_name}
                        </li>
                    ))}
                </ul>
                <Link to={"/addEvent/"}>Add </Link>
            </div>
            <div className="col-md-6">
                {currentEvent ? (<EventSingle selectedEvent={currentEvent}/>) :
                    <div>
                        <br/>
                        <p>Please click on an Event...</p>
                    </div>}

            </div>
        </>
    )

}
export default EventCollection;
