import React from "react";
import {Link} from "react-router-dom";

const eventSingle = ({selectedEvent}) =>{

    return(
        <>
            <h4>Event  {selectedEvent.event_short}:</h4>
            <div>
                <label><strong>Name:</strong></label>{" "}
                {selectedEvent.event_name}
            </div>

            <Link
                to={"/event/" +selectedEvent.event_short}
                className="btn btn-warning"
            >
                Edit
            </Link>
        </>

    )
}
export default eventSingle;
