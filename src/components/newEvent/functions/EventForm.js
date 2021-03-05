import React, {useEffect} from "react";
import Comments from "../../season/functions/Comments";
import PropTypes from "prop-types";


const EventForm= ({myEvent, handleInputChange}) => {

    // combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log('[SeasonForm] useEffect');

    }, []);
    return (
        <div className="submit-form border border-success">
            <div >
                <label htmlFor="membership_name" className="h6 small"> Event Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="event_name"
                    name="event_name"
                    placeholder="Event Name"
                    value={myEvent.event_name}
                    required={true}
                    onChange={handleInputChange}
                />
                <label htmlFor="membership_year" className="h6 small"> Event Acronym</label>
                <input
                    type="text"
                    className="form-control"
                    id="event_short"
                    name="event_short"
                    placeholder="Event Short Name"
                    value={myEvent.event_short}
                    required={true}
                    onChange={handleInputChange}
                />

            </div>
        </div>
    )
}

EventForm.propTypes= {
    myEvent:PropTypes.object,
    handleInputChange:PropTypes.func,
 };
export default  React.memo(EventForm);
